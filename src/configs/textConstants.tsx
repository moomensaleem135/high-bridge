export const textConstants = {
  loginTitle: 'Log In',
  noAccountText: 'Don’t have an account?',
  signUpText: 'Sign up',
  emailLabel: 'Email Address',
  passwordLabel: 'Password',
  hideText: 'Hide',
  showText: 'Show',
  forgotPasswordText: 'Forgot Password',
  continueButtonText: 'Continue',

  // Added texts from StorageSelection component
  storagePageTitle: 'Choose Your Storage',
  pageDescription: 'Select your preferred storage option for your data.',
  localStorageLabel: 'Local Storage:',
  localStorageDescription:
    'Your data will be saved on your local drive, no one from Zakat software can view or access the data.',
  serverStorageLabel: 'Server Storage:',
  serverStorageDescription:
    'Your data will be encrypted and saved on the server side. Only with your approval Zakat software admins can view or access the data.',
  successMessage: 'Storage selection successful.',
  nextButtonText: 'Next',

  // Added texts for SignUp component
  createAccountTitle: 'Create an account',
  alreadyHaveAccountText: 'Already have an account?',
  logInText: 'Log in',
  usernameLabel: 'Username:',
  confirmPasswordLabel: 'Confirm Password:',
  createAccountButtonText: 'Create an account',
  signupSuccessMessage: 'Signup successful.',
  signupErrorMessage: 'Failed to Create event',

  // Added texts for ProfileSetup component
  profileSetupTitle: 'Profile Setup',
  profileSetupDescription:
    'You can update this information from the Setup screen anytime if needed.',
  religionLabel: 'Which madhab do you follow by default?',
  calendarLabel: 'According to which calendar do you pay zakat?',
  zakatDateLabel: 'Which date to pay Zakat?',
  zakatPeriodTextStart: 'The Zakat period starts on ',
  zakatPeriodTextEnd: ' of the following year.',
  profileSetupSuccessMessage: 'Profile setup successful.',
  profileSetupErrorMessage: 'Failed to Create event',
  skipText: 'Skip for Now',

  // ForgotPassword component constants
  forgotPasswordTitle: 'Forgot your password?',
  forgotPasswordDescription:
    'Don’t worry, happens to all of us. Enter your email below to recover your password',
  verificationSuccessMessage: 'Verification code sent on the provided email',
  verificationErrorMessage: 'Failed to Create event',
  backToLoginText: 'Back to login',

  // VerifyCOde component constants
  verifyCodeTitle: 'Verify Code',
  verifyCodeDescription: 'An authentication code has been sent to your email.',
  verifyButtonText: 'Verify',
  verifyCodeSuccessMessage: 'Verification successful.',
  verifyCodeErrorMessage: 'Failed to verify code',
  codeText: 'Didn’t receive a code?',
  resendText: 'Resend',

  // ResetPassword component texts
  resetPasswordTitle: 'Set a Password',
  resetPasswordDescription:
    'Your previous password has been reset. Please set a new password for your account.',
  createPasswordLabel: 'Create Password:',
  reEnterPasswordLabel: 'Re-enter Password:',
  setPasswordButtonText: 'Set Password',
  resetPasswordSuccessMessage: 'Password reset successful.',
  resetPasswordErrorMessage: 'Failed to reset password',

  // Top Navbar
  zakatDueValueText: 'Zakat Due:',
  zakatPayDateText: 'Zakat Pay Date:',
  // Side Navbar Main
  mainSectionHeading: 'MAIN',
  navHome: 'Home',
  navProfileSetup: 'Setup',
  navIncome: 'Income',
  navDeduction: 'Deductions',
  navReviewZakat: 'Review Zakat',
  navPayZakat: 'Pay Zakat',
  // Side Navbar Settings
  settingsSectionHeading: 'SETTINGS',
  navProfile: 'Profile',
  navSettings: 'Settings',
  // Side Navbar Profile Items
  navHelp: 'Help',
  navLogOut: 'Logout Account',
  navModeSelection: 'Dark Mode',

  //Profile Details Page
  profileDetailsmainHeading: 'Account Set Up',
  profileDetailsmainParagraph:
    'Begin calculating your zakat by choosing your income sources from the options listed below.',

  //Gold and Silver Items Form
  goldItemAddFormHeading: 'Add Gold & Sliver Items',
  goldItemEditFormHeading: 'Edit Gold & Sliver Items',
  goldItemFormParagraph:
    'Here’s what you have so far. Please add your gold and silver items such as tola, grams, or ounces.',

  goldItemPurposeLabel: 'What is the purpose of this item?',
  goldItemQualityLabel: 'What is the purity of this item?',
  goldItemWeightLabel: ' What is the estimated weight of this item?',
  goldItemPriceLabel: 'What is the price to buy this item?',
  goldItemExcessiveAmountText:
    'Does this exceed the normal personal usage quantity in your society?',

  //Values used in multiple places in forms
  itemLabel: 'Which item do you have?',
  zakatNotApplicableHeading: 'Your Zakat is not applicable to this item.',
  zakatnotApplicableText:
    'Zakat is not applicable to this item, as personal belongings like clothing, household items, and primary residence are generally exempt from Zakat.',
  zakatPayableText: 'Your payable zakat for this item is:',
  itemAddSuccessText: 'item added successfully.',
  itemEditSuccessText: 'item edited successfully.',
  formBackButtonText: 'Back',
  formNextButtonText: 'Next',
  formNoButtonText: 'No',
  formYesButtonText: 'Yes',
  formAddItemButton: 'Add Item',
  formEditItemButton: 'Update Item',
  formAddAnotherItemButton: ' Add Another Item',

  //Liquid Assets Form
  addLiquidAssetsMainHeading: 'Add Liquid Assets Items',
  editLiquidAssetsMainHeading: 'Edit Liquid Assets Items',
  editCashAndChecking: 'Update Cash & Checking Items',
  liquidAssetSummaryReport: 'Liquid Asset Item Summary Report',

  LiquidItemsMainParagraph:
    'Here’s what you have so far. Please add your cash and checking account balances for accurate zakat calculation',
  itemNameLabel: 'What should the title for this item be?',
  itemQuantityLabel:
    'What is the balance of this account on the zakat pay date?',

  //House Items Form
  addHouseItemTitle: 'Add House Items',
  editHouseItemTitle: 'Edit House Items',
  houseItemDescription:
    'Please add your house items, as zakat is valid only on savings and items held for trading or rental purposes.',
  houseOptionsText:
    ' Please select the purpose of your house by choosing one of the options below:',
  housePurposeLabel: ' Select one option to proceed to the next step.',
  alreadyRecorderHeading:
    'Have you already recorded this amount in your liquid assets?',
  zakatAlreadyRecordedText:
    'You have already included your zakat in your liquid assets; therefore, no zakat is required for this item.',
  personalUseText:
    'Zakat is not applicable for items used for Personal Use. This means you don’t need to pay zakat on things you use for living, as zakat only applies to items for trading, rental, or savings.',
  tradeUseText:
    'Zakat is applicable to assets designated for trading. Kindly include this item in your commercial assets, as zakat is calculated based on items held for sale or profit.',

  //income section text
  incomeSourceText: 'Zakat on Various Income Sources',
  zakatCalculationText:
    'Start calculating your zakat by selecting your income sources from the options below.',
  incomeStartButtonText: 'Start',
  //personal
  personalPropertyType: 'Personal Property:',
  goldAndSilverItem: 'Gold & Silver',
  liquidAssetsItem: 'Liquid Assets (Cash, Checking, Saving, Loan)',
  houseItem: 'House',
  stockItem: 'Stocks',
  retirementItem: 'Retirement Accounts',

  //commercial
  commercialPropertyType: 'Commercial Property:',
  goodAndServiceItem: 'Goods & Services',
  manufactureItem: 'Manufacturing Plant',
  farmItem: 'Farmland',
  livestockItem: 'Animal Livestock',
  realEstateItem: 'Real Estate',
  rentalItem: 'Rentals',

  //Review Section
  reviewZakatHeading: 'Review Zakat',
  reviewZakatParagraphStart:
    'Review your zakat details below to ensure accuracy. Confirm the items, amounts,',
  reviewZakatParagraphEnd:
    'and selected madhab before finalizing your zakat payment.',
  reviewGoldAndSilver: 'Gold & Silver',
  reviewHouse: 'House',
  reviewCashAndChecking: ' Cash & Checking',
  previewButtonText: 'Preview',

  //Custom Option
  editText: 'Edit',
  deleteText: 'Delete',

  //empty table text
  emptyTableHeading: 'No Data Available',
  emptyTableParagraph: 'Please check back later or try a different filter.',

  //Table
  addGoldAndSilverItemsText:
    ' Here’s what you have so far. Please add your gold and silver items such as tola, grams, or ounces.',
  addHouseItemsText:
    'Please add your house items, as zakat is valid only on savings and items held for trading or rental purposes.',
  addCashAndCheckingItemsText:
    'Here’s what you have so far. Please add your cash, checking, saving, and loan balances for an accurate zakat calculation.',
};
