# Rahul Shetty Academy Login Page Test Plan

## Application Overview

The Rahul Shetty Academy Login Practice Page is a form-based authentication interface that allows users to log in with different roles (Admin/User) and occupations (Student/Teacher/Consultant). The test plan covers functional testing of the login form, including happy path scenarios, negative testing, role-based behavior, and form validation.

## Test Scenarios

### 1. Authentication - Happy Path

**Seed:** `tests/seed.spec.ts`

#### 1.1. Successful login with Admin role and valid credentials

**File:** `tests/login/successful-admin-login.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
    - expect: Form fields are visible and empty
    - expect: Admin role is selected by default
    - expect: Student occupation is selected by default
  2. Enter username 'rahulshettyacademy' in the Username field
    - expect: Username is entered correctly in the field
  3. Enter password 'Learning@830$3mK2' in the Password field
    - expect: Password is entered correctly in the field (masked with dots)
  4. Verify Admin role is selected
    - expect: Admin radio button is checked
  5. Click the Sign In button
    - expect: User is redirected to the shop page (https://rahulshettyacademy.com/angularpractice/shop)
    - expect: Shop page title is 'ProtoCommerce'
    - expect: Navigation and product listings are visible

#### 1.2. Successful login without checking terms and conditions checkbox

**File:** `tests/login/login-without-terms-accepted.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
    - expect: Terms and conditions checkbox is unchecked
  2. Enter username 'rahulshettyacademy'
    - expect: Username field contains the entered value
  3. Enter password 'Learning@830$3mK2'
    - expect: Password field contains the entered value (masked)
  4. Leave terms and conditions checkbox unchecked
    - expect: Checkbox remains unchecked
  5. Click Sign In button
    - expect: User is redirected to the shop page
    - expect: Login is successful even without accepting terms and conditions

#### 1.3. Successful login with User role after confirmation

**File:** `tests/login/successful-user-role-login.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Click on the User role radio button
    - expect: A dialog appears with message: 'You will be limited to only fewer functionalities of the app. Proceed?'
    - expect: Dialog has Cancel and Okay buttons
  3. Click the Okay button in the dialog
    - expect: Dialog closes
    - expect: User role radio button remains selected
  4. Enter username 'rahulshettyacademy'
    - expect: Username is entered in the field
  5. Enter password 'Learning@830$3mK2'
    - expect: Password is entered in the field
  6. Click Sign In button
    - expect: User is redirected to shop page
    - expect: Login is successful with User role

### 2. Authentication - Negative Testing

**Seed:** `tests/seed.spec.ts`

#### 2.1. Login with invalid username and valid password

**File:** `tests/login/invalid-username-login.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Enter username 'invaliduser' (or any non-existent username)
    - expect: Invalid username is entered in the field
  3. Enter password 'Learning@830$3mK2' (correct password)
    - expect: Password is entered in the field
  4. Check the terms and conditions checkbox
    - expect: Checkbox is checked
  5. Click Sign In button
    - expect: Page remains on the login page
    - expect: No redirect occurs
    - expect: User stays on https://rahulshettyacademy.com/loginpagePractise/

#### 2.2. Login with valid username and invalid password

**File:** `tests/login/invalid-password-login.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Enter username 'rahulshettyacademy' (correct username)
    - expect: Username is entered in the field
  3. Enter password 'wrongpassword' (incorrect password)
    - expect: Wrong password is entered in the field
  4. Check the terms and conditions checkbox
    - expect: Checkbox is checked
  5. Click Sign In button
    - expect: Page remains on the login page
    - expect: No redirect occurs
    - expect: User stays on the login page

#### 2.3. Login with empty username field

**File:** `tests/login/empty-username-login.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
    - expect: Username field is empty
  2. Leave username field empty
    - expect: Username field remains empty
  3. Enter password 'Learning@830$3mK2' in the password field
    - expect: Password is entered in the field
  4. Check the terms and conditions checkbox
    - expect: Checkbox is checked
  5. Click Sign In button
    - expect: Page remains on the login page
    - expect: No redirect occurs

#### 2.4. Login with empty password field

**File:** `tests/login/empty-password-login.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
    - expect: Password field is empty
  2. Enter username 'rahulshettyacademy'
    - expect: Username is entered in the field
  3. Leave password field empty
    - expect: Password field remains empty
  4. Check the terms and conditions checkbox
    - expect: Checkbox is checked
  5. Click Sign In button
    - expect: Page remains on the login page
    - expect: No redirect occurs

#### 2.5. Login with both username and password fields empty

**File:** `tests/login/empty-both-fields-login.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Leave both username and password fields empty
    - expect: Both fields remain empty
  3. Check the terms and conditions checkbox
    - expect: Checkbox is checked
  4. Click Sign In button
    - expect: Page remains on the login page
    - expect: No redirect or error occurs

#### 2.6. Password field is case-sensitive

**File:** `tests/login/case-sensitive-password.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Enter username 'rahulshettyacademy'
    - expect: Username is entered in the field
  3. Enter password 'learning@830$3mk2' (lowercase version) instead of 'Learning@830$3mK2'
    - expect: Wrong case password is entered in the field
  4. Check the terms and conditions checkbox
    - expect: Checkbox is checked
  5. Click Sign In button
    - expect: Page remains on the login page
    - expect: Login fails due to case mismatch

### 3. Form Interactions and UI Elements

**Seed:** `tests/seed.spec.ts`

#### 3.1. Cancel User role confirmation dialog

**File:** `tests/login/cancel-user-role-dialog.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
    - expect: Admin role is selected by default
  2. Click on the User role radio button
    - expect: Dialog appears with message: 'You will be limited to only fewer functionalities of the app. Proceed?'
  3. Click the Cancel button in the dialog
    - expect: Dialog closes
    - expect: Admin role remains selected
    - expect: User role is deselected

#### 3.2. Select different occupations from dropdown

**File:** `tests/login/occupation-dropdown-selection.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
    - expect: Student occupation is selected by default
  2. Click on the occupation dropdown
    - expect: Dropdown opens
    - expect: Options visible: Student, Teacher, Consultant
  3. Select 'Teacher' from the dropdown
    - expect: Teacher is now selected in the dropdown
  4. Click on the dropdown again
    - expect: Dropdown opens with Teacher selected
  5. Select 'Consultant' from the dropdown
    - expect: Consultant is now selected in the dropdown
  6. Select 'Student' from the dropdown
    - expect: Student is now selected in the dropdown

#### 3.3. Terms and conditions checkbox toggle

**File:** `tests/login/terms-checkbox-toggle.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
    - expect: Terms and conditions checkbox is unchecked
  2. Click on the terms and conditions checkbox
    - expect: Checkbox is now checked
  3. Click on the checkbox again
    - expect: Checkbox is now unchecked
  4. Click on the checkbox once more
    - expect: Checkbox is now checked

#### 3.4. Terms and conditions link interaction

**File:** `tests/login/terms-link-interaction.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
    - expect: Terms and conditions link is visible
  2. Click on the 'terms and conditions' link
    - expect: Link behavior is as expected (either opens modal, navigates to new page, or does nothing if href is #)

### 4. Combination Testing - Role and Occupation

**Seed:** `tests/seed.spec.ts`

#### 4.1. Login with Admin role and Teacher occupation

**File:** `tests/login/admin-teacher-combination.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Verify Admin role is selected (default)
    - expect: Admin radio button is checked
  3. Select 'Teacher' from the occupation dropdown
    - expect: Teacher occupation is selected
  4. Enter username 'rahulshettyacademy'
    - expect: Username is entered
  5. Enter password 'Learning@830$3mK2'
    - expect: Password is entered
  6. Check the terms and conditions checkbox
    - expect: Checkbox is checked
  7. Click Sign In button
    - expect: User is redirected to shop page
    - expect: Login succeeds with Admin role and Teacher occupation

#### 4.2. Login with User role and Consultant occupation

**File:** `tests/login/user-consultant-combination.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Click on User role radio button
    - expect: Dialog appears asking for confirmation
  3. Click Okay to confirm User role
    - expect: Dialog closes
    - expect: User role is selected
  4. Select 'Consultant' from occupation dropdown
    - expect: Consultant occupation is selected
  5. Enter username 'rahulshettyacademy'
    - expect: Username is entered
  6. Enter password 'Learning@830$3mK2'
    - expect: Password is entered
  7. Check the terms and conditions checkbox
    - expect: Checkbox is checked
  8. Click Sign In button
    - expect: User is redirected to shop page
    - expect: Login succeeds with User role and Consultant occupation

### 5. Form Input Validation and Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 5.1. Input fields accept special characters

**File:** `tests/login/special-characters-input.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Enter special characters in username field (e.g., '@#$%')
    - expect: Special characters are accepted and displayed in the field
  3. Enter special characters in password field (e.g., '@#$%')
    - expect: Special characters are accepted in the password field
  4. Clear both fields
    - expect: Fields are cleared successfully

#### 5.2. Username and password fields accept whitespace

**File:** `tests/login/whitespace-input.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Enter spaces in username field
    - expect: Spaces are entered in the field
  3. Enter spaces in password field
    - expect: Spaces are entered in the field
  4. Click Sign In button
    - expect: Form submission is handled without errors

#### 5.3. Username field accepts long strings

**File:** `tests/login/long-username-input.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Enter a very long username string (50+ characters)
    - expect: Long string is entered in the field
    - expect: Field displays the text appropriately (may scroll or truncate visually)
  3. Enter valid password 'Learning@830$3mK2'
    - expect: Password is entered
  4. Check the terms and conditions checkbox
    - expect: Checkbox is checked
  5. Click Sign In button
    - expect: Form is submitted
    - expect: Login fails as expected (invalid username)

#### 5.4. Password field masks input correctly

**File:** `tests/login/password-masking.spec.ts`

**Steps:**
  1. Navigate to https://rahulshettyacademy.com/loginpagePractise/
    - expect: Login page loads successfully
  2. Click on the password field
    - expect: Password field is focused
  3. Type several characters in the password field
    - expect: Characters are masked with dots or asterisks
    - expect: Actual characters are not visible
