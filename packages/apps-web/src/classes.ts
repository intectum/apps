export const classes = (classes: (string | false | null | undefined)[]) =>
  classes.filter(theClass => !!theClass).join(' ') || undefined;
