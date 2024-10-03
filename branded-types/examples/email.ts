type EmailAddress = string & { __brand: "EmailAddress" };

function isEmailAddress(email: string): email is EmailAddress {
  return email.includes("@gmail.com");
}

function assertEmailAddress(email: string): asserts email is EmailAddress {
  if (!email.includes("@gmail.com")) {
    throw new Error(`InvalidArgument: ${email} is not an email`);
  }
}

const signup = (email: string) => {
  assertEmailAddress(email);

  if (isEmailAddress(email)) {
    // EXPECT WORKS
    sendWelcomEmail(email);
  }

  // EXPECT ERROR
  sendWelcomEmail(email);
};

function sendWelcomEmail(e: EmailAddress) {}
