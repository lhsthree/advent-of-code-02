// Import, Format and Process Data
const fs = require('fs')
fs.readFile('input.txt', 'utf8' , (err, data) => {
  if (err) console.error(err)
  else {
       // Split and format the input text into an Array of Objects in a format we can use.    
       data.split("\n").map(el => {
           dataArray.push({
               minCount: el.split(" ")[0].split('-')[0],
               maxCount: el.split(" ")[0].split('-')[1],
               char: el.split(" ")[1].replace(":", ""),
               pass: el.split(" ")[2]
           })
       })

       // Map through the new Array, testing each password set against the criteria for both
       // part one and part two.    
       dataArray.map(el => {
           partOneTest(el)
           partTwoTest(el)
        })
       // Log the overall results   
       logResults()
  }
});

// Set up some data containers
const dataArray = [];
const results = {
    partOne_validPasswordCount: 0,
    partOne_invalidPasswordCount: 0,
    partTwo_validPasswordCount: 0,
    partTwo_invalidPasswordCount: 0
};

// ============================| PART ONE TEST |============================ \\
const partOneTest = ({minCount, maxCount, char, pass}) => {
    const charToTest = new RegExp(char,"g");
    const count = (pass.match(charToTest)||[]).length;
    if((count >= minCount) && (count <= maxCount)) results.partOne_validPasswordCount++;
    else  results.partOne_invalidPasswordCount++;
};

// ============================| PART TWO TEST |============================ \\
const partTwoTest = ({minCount: pos1, maxCount: pos2, char, pass}) => {
    let test1, test2;
  
    pass[parseInt(pos1) - 1] === char ? test1 = true : test1 = false;
    pass[parseInt(pos2) - 1] === char ? test2 = true : test2 = false;

    if(test1 != test2) results.partTwo_validPasswordCount++;
    else results.partTwo_invalidPasswordCount++;
};

// Function to create a log, to keep the code above clean
const logResults = () => {
  console.log("\n", `========| RESULTS: |======== `, "\n", 
  `Part One - Valid Passwords: ${results.partOne_validPasswordCount}`, "\n", 
  `Part One - Invalid Passwords: ${results.partOne_invalidPasswordCount}`, "\n\n",
  `Part Two - Valid Passwords: ${results.partTwo_validPasswordCount}`, "\n", 
  `Part Two - Invalid Passwords: ${results.partTwo_invalidPasswordCount}`, "\n",
  )  
};