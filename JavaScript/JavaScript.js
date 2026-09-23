
document.getElementById("btn_Pay").addEventListener("click", () => {
    let UserInfo =
    {
        master_card: document.getElementById('card_number').value,
        exp_year: document.getElementById('expiry_year').value,
        exp_month: document.getElementById('expiry_month').value,
        cvv_code: document.getElementById('cvv').value
    };

    let valid = true;


    // (1) Verify the total number of entered digits for credit cards is 16
    if (UserInfo.master_card.length !== 16) {
        alert('Please enter a valid 16-digit card number.');
        valid = false;
    }

    // (2) Verify the MasterCard number starts with 51, 52, 53, 54, or 55
    let firstTwoDigits = UserInfo.master_card.slice(0, 2);
    if (firstTwoDigits !== '51' && firstTwoDigits !== '52' && firstTwoDigits !== '53' && firstTwoDigits !== '54' && firstTwoDigits !== '55') {
        alert('Please enter a valid MasterCard number starting with 51, 52, 53, 54, or 55.');
        valid = false;
    }

    // (3) Verify the card is not expired
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear().toString().slice(2);
    let currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');

    if (parseInt(UserInfo.exp_year) < parseInt(currentYear) || (parseInt(UserInfo.exp_year) === parseInt(currentYear) && parseInt(UserInfo.exp_month) < parseInt(currentMonth))) {
        alert('Your card is expired. Please enter a valid expiry date.');
        valid = false;
    }

    // (4) Verify the total number of digits for security code is 3 or 4
    if (UserInfo.cvv_code.length !== 3 && UserInfo.cvv_code.length !== 4) {
        alert('Please enter a valid 3 or 4-digit security code.');
        valid = false;
    }

    if (valid === true) {
        event.preventDefault();
        const data =
        {
            "master_card": String(UserInfo.master_card),
            "exp_year": parseInt(UserInfo.exp_year),
            "exp_month": parseInt(UserInfo.exp_month),
            "cvv_code": String(UserInfo.cvv_code)
        }
        let num = String(UserInfo.master_card);
        fetch("http://mudfoot.doc.stu.mmu.ac.uk/node/api/creditcard",
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
                
            })

            .then((response) => {
                if (response.status === 200) {

                    return response.json();
                }
                else if (response.status === 400) { throw "Bad data was sent to the server"; }
                else { throw "Error please try again" }
            }).catch((error) => { alert(error); })
            .then((data) => 
            {
                localStorage.setItem( "pass1", num          );
                localStorage.setItem( "pass2", data.message );
                window.location.href = "success.html";
            })
    }
});

function Pay() { window.location.href = "../pay.html"; }




