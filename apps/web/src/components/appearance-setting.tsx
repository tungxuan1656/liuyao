import { useState } from 'react';
import { getCurrentTheme, setTheme, type Theme } from '../lib/theme';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from './ui/field';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

const themeOptions: { value: Theme; label: string; detail: string }[] = [
  { value: 'light', label: 'Sáng', detail: 'Nền sáng, chữ tối.' },
  { value: 'dark', label: 'Tối', detail: 'Nền tối, chữ sáng.' },
];

export function AppearanceSetting() {
  const [theme, setThemePreference] = useState<Theme>(getCurrentTheme);

  function selectTheme(next: Theme) {
    setThemePreference(next);
    setTheme(next);
  }

  return (
    <Card className="lg:col-span-12">
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          Giao diện
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          aria-label="Giao diện"
          className="sm:grid-cols-2"
          value={theme}
          onValueChange={value => selectTheme(value as Theme)}
        >
          {themeOptions.map(({ value, label, detail }) => (
            <FieldLabel key={value}>
              <Field orientation="horizontal">
                <RadioGroupItem value={value} />
                <FieldContent>
                  <FieldTitle>{label}</FieldTitle>
                  <FieldDescription>{detail}</FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
