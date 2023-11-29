**Summary**

Passwords are secretly truncated, that is - MODIFIED without user knowledge, because of lack of validation and improper (limited) Bcrypt hashing, allowing unauthorized access to an account when an attacker possesses knowledge of the first 72 bytes of a user's password. This flaw results from password truncation, where passwords exceeding 72 bytes are not fully validated, leaving the system vulnerable.

This limitation even mentioned in the [owasp password cheat sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#bcrypt)

**Steps to Reproduce**

**Example 1**

	1) set the password of an account to `ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிRAKESH1@a`
	2) Attempt to log in to the account using an invalid password, e.g. `ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கி`
	   (successfully logs in and you can make even shorter up to 72 bytes)
	3) Successfully logged in to the account despite using an incorrect password.

Below are some of the invalid passwords i tried that has been logged in successfully

    `ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிRAKESH1@a12312
    ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்asdஆங்கிலம்ஆங்கிRAKESH1@aasd234`

The worst and small length you can login with **ஆங்கிலம்ஆங்கிலம்ஆங்கிலம்** (24characters for this password)

**Example 2**
	1) Change your password to 𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽
	𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽 (128 characters long, change the no of characters according to company’s password policy)
	2) Login with your user and the password 𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽𩸽 (18 characters and 72 bytes long, Bcrypt's limit)

**You've just logged in with a password 110 characters shorter from the one you just set.**

**Attack Scenario**

Let say a user uses a password “**கடவுச்சொல்@நிறுவனத்தின்பெயர்**” which is (28 charc, 83 bytes) which translates “**Password@Companyname**” The user, unaware of this vulnerability, may use a similar passphrase across multiple applications, believing that their accounts are secure due to different passwords for each application. However, if this passphrase becomes compromised in another application(by any
other means like data breaches, malware etc), an attacker can exploit the first 72 bytes to gain unauthorized access to the user's account on your platform

**Impact**
Despite not being intentional, users are being lied to. Many passwords are being modified (and weakened, by shortening its size) without users knowing. Not only does it impact on the security, but also on the trust users have for the platform, for failing in acknowledging the current behaviour. On the technical side, it even weakens users' accounts to brute force attacks, since the password can be extremely shortened (as in Example 2 on the previous topic). Remember, this doesn't impact only people who use long passwords, since, as I just showed, non-ASCII characters can take up to 4 bytes!!

**References**
https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#bcrypt
https://www.php.net/function.password-hash
https://www.monterail.com/blog/more-secure-passwords-bcrypt
