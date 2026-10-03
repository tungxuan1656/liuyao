import { readFileSync, realpathSync, statSync } from 'node:fs';
import path from 'node:path';

/** Validate project-convention evidence against the manifest registry and repository documents. */
export function checkProjectEvidence({ manifest, records, repositoryRoot, fail }) {
  const claims = records.flatMap(record =>
    allClaims(record)
      .filter(claim => claim.kind === 'project-convention')
      .map(claim => ({ record, claim })),
  );
  const registeredContracts = manifest.projectContracts ?? [];
  if (!claims.length && !registeredContracts.length) return;

  const root = realpathSync(repositoryRoot);
  const contracts = new Map();
  for (const contract of registeredContracts) {
    if (typeof contract.revision !== 'string' || contract.revision.trim().length === 0)
      fail(`accepted project contract ${contract.documentPath}: non-empty revision is required`);
    if (!Array.isArray(contract.sections) || contract.sections.length === 0)
      fail(
        `accepted project contract ${contract.documentPath}: at least one accepted section is required`,
      );
    for (const section of contract.sections) {
      if (typeof section !== 'string' || !/^#{1,6}\s+\S/.test(section))
        fail(
          `accepted project contract ${contract.documentPath} has invalid heading ${String(section)}`,
        );
    }
    const key = contract.documentPath;
    if (contracts.has(key)) fail(`duplicate accepted project contract ${key}`);
    contracts.set(key, contract);
    const document = resolveCanonicalDocument(root, contract.documentPath, fail);
    for (const section of contract.sections) {
      if (!hasHeading(document, section))
        fail(`accepted project contract ${contract.documentPath} has missing heading ${section}`);
    }
    if (new Set(contract.sections).size !== contract.sections.length)
      fail(`accepted project contract ${contract.documentPath} has duplicate sections`);
  }

  for (const { record, claim } of claims) {
    for (const evidence of claim.projectEvidence ?? [])
      resolveCanonicalDocument(root, evidence.documentPath, fail);
    if (claim.citationIds?.length !== 0)
      fail(`${claim.id}: project convention must not use book citations`);
    if (!claim.projectEvidence?.length)
      fail(`${claim.id}: project convention needs projectEvidence`);
    for (const evidence of claim.projectEvidence) {
      const contract = contracts.get(evidence.documentPath);
      if (!contract) fail(`${claim.id}: no accepted project contract for ${evidence.documentPath}`);
      if (evidence.revision !== contract.revision)
        fail(`${claim.id}: project evidence revision does not match ${evidence.documentPath}`);
      if (!contract.sections.includes(evidence.section))
        fail(
          `${claim.id}: section ${evidence.section} is not accepted for ${evidence.documentPath}`,
        );
      const document = resolveCanonicalDocument(root, evidence.documentPath, fail);
      if (!hasHeading(document, evidence.section))
        fail(
          `${claim.id}: missing project evidence heading ${evidence.section} in ${evidence.documentPath}`,
        );
    }
    if (record.review.status === 'reviewed') {
      const evidenceIds = new Set(record.review.evidenceClaimIds ?? []);
      const requiredIds = new Set([claim.id]);
      const pending = [claim.id];
      while (pending.length) {
        const current = pending.pop();
        for (const dependencyId of findClaim(records, current)?.dependsOnClaimIds ?? []) {
          if (requiredIds.has(dependencyId)) continue;
          requiredIds.add(dependencyId);
          pending.push(dependencyId);
        }
      }
      for (const id of requiredIds)
        if (!evidenceIds.has(id))
          fail(`${record.id}: review evidence omits project-convention claim ${id}`);
    }
  }
}

function allClaims(record) {
  return [
    ...(record.claims ?? []),
    ...(record.lines ?? []).flatMap(line => line.claims ?? []),
    ...(record.specialPassages ?? []).flatMap(passage => passage.claims ?? []),
  ];
}

function findClaim(records, claimId) {
  for (const record of records) {
    const found = allClaims(record).find(claim => claim.id === claimId);
    if (found) return found;
  }
  return undefined;
}

function resolveCanonicalDocument(root, documentPath, fail) {
  if (
    typeof documentPath !== 'string' ||
    documentPath.length === 0 ||
    path.isAbsolute(documentPath) ||
    documentPath.includes('\\') ||
    documentPath.split('/').some(part => part === '..' || part === '.' || part === '')
  )
    fail(`unsafe project contract path ${String(documentPath)}`);

  const target = path.resolve(root, documentPath);
  if (!target.startsWith(`${root}${path.sep}`))
    fail(`project contract path escapes repository: ${documentPath}`);
  let canonical;
  try {
    canonical = realpathSync(target);
    if (!canonical.startsWith(`${root}${path.sep}`))
      fail(`project contract path escapes repository through symlink: ${documentPath}`);
    if (!statSync(canonical).isFile()) fail(`project contract path is not a file: ${documentPath}`);
    return readFileSync(canonical, 'utf8');
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Invalid book corpus:')) throw error;
    fail(`project contract document does not exist: ${documentPath}`);
  }
}

function hasHeading(document, section) {
  if (typeof section !== 'string' || !/^#{1,6}\s+\S/.test(section)) return false;
  return document.split(/\r?\n/).some(line => line.trim() === section.trim());
}
