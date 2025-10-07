export const getAdvice = (distance: number) => {
  let advice = `You are at a safe distance from Britain's most prolific celebrity sex offender.`;

  if (distance < 100 && distance > 50) {
    advice =
      'You are approaching an unsafe distance to Savile, close enough for him to slip his black tongue into your mouth.';
  } else if (distance < 50 && distance > 10) {
    advice = `Fancy milking a cow blindfolded? Jim'll Fix it for you! You're too close for comfort.`;
  } else if (distance < 10 && distance > 1) {
    advice =
      'Savile is almost on top of you, escape while you can or risk being victim to a Jimmy finger.';
  } else if (distance < 1) {
    advice =
      'DANGER! You are in spitting distance of the evil dirty old bastard Jimmy Savile.';
  }

  return advice;
};
