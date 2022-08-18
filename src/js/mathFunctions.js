let randomNumber1 = Math.floor(Math.random() * 10 + 1);
let randomNumber2 = Math.floor(Math.random() * 10 + 1);

function additionGame(randomNumber1, randomNumber2, number1, number2){
    // computer portion 
    console.log("Computer chose: " + randomNumber1);
    console.log("Computer chose: " + randomNumber2);

    let computerSum = randomNumber1 + randomNumber2; // arithmetic calculation

    console.log("Computer total is " + computerSum);

    console.log(" ");

    // user portion
    console.log("Enter a number: " + number1);
    console.log("Enter another number: " + number2);

    let playerTotal = number1 + number2; // arithmetic calculation
    console.log("Sum of numbers is: " + playerTotal);

    console.log(" ");

    if (computerSum > playerTotal){
        console.log("Computer wins!!!");
    } else if (playerTotal > computerSum){
        console.log("Congrats!! You win!!");
    } else {
        console.log("Its a tie!!");
    }
}

function subtractionGame(randomNumber1, randomNumber2, number1, number2){
    // computer portion 
    console.log("Computer chose: " + randomNumber1);
    console.log("Computer chose: " + randomNumber2);

    let computerTotal = randomNumber1 - randomNumber2; // arithmetic calculation

    console.log("Computer total is " + computerTotal);

    console.log(" ");

    // user portion
    console.log("Enter a number: " + number1);
    console.log("Enter another number: " + number2);

    let playerTotal = number1 - number2; // arithmetic calculation
    console.log("Total of numbers is: " + playerTotal);

    console.log(" ");

    if (computerTotal > playerTotal){
        console.log("Computer wins!!!");
    } else if (playerTotal > computerTotal){
        console.log("Congrats!! You win!!");
    } else {
        console.log("Its a tie!!");
    }
}

function multiplicationGame(randomNumber1, randomNumber2, number1, number2){
    // computer portion 
    console.log("Computer chose: " + randomNumber1);
    console.log("Computer chose: " + randomNumber2);

    let computerSum = randomNumber1 * randomNumber2; // arithmetic calculation

    console.log("Computer total is " + computerSum);

    console.log(" ");

    // user portion
    console.log("Enter a number: " + number1);
    console.log("Enter another number: " + number2);

    let playerTotal = number1 * number2; // arithmetic calculation
    console.log("Sum of numbers is: " + playerTotal);

    console.log(" ");

    if (computerSum > playerTotal){
        console.log("Computer wins!!!");
    } else if (playerTotal > computerSum){
        console.log("Congrats!! You win!!");
    } else {
        console.log("Its a tie!!");
    }
}

function divisonGame(randomNumber1, randomNumber2, number1, number2){
    // computer portion 
    console.log("Computer chose: " + randomNumber1);
    console.log("Computer chose: " + randomNumber2);

    let computerSum = randomNumber1 / randomNumber2; // arithmetic calculation

    console.log("Computer total is " + computerSum);

    console.log(" ");

    // user portion
    console.log("Enter a number: " + number1);
    console.log("Enter another number: " + number2);

    let playerTotal = number1 / number2; // arithmetic calculation
    console.log("Sum of numbers is: " + playerTotal);

    console.log(" ");

    if (computerSum > playerTotal){
        console.log("Computer wins!!!");
    } else if (playerTotal > computerSum){
        console.log("Congrats!! You win!!");
    } else {
        console.log("Its a tie!!");
    }
}