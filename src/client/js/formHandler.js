import 'regenerator-runtime/runtime.js' // for jest tests

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let userEntry = document.getElementById('name').value
    if (!Client.checkForUrl(userEntry)) {
        alert('URL must start with http:// or https://')
        return;
    }
    
    postData('/submit', { urlString: userEntry })
        .then(() => updateUI())
        .catch(function (error) {
            alert(error)
        })
};

// post data
const postData = async (url = '', data = {}) => {
  
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (response.status != 201) throw new Error('bad request');
  }
  
const updateUI = async () => {
    
    const request = await fetch('/all');
    try {
        const allData = await request.json();

        const index = allData.length - 1;

        let polarityPercent = makePercent(allData[index].polarity_confidence)
        let subjectivityPercent = makePercent(allData[index].subjectivity_confidence)
        
        document.getElementById('polarity').innerHTML = 'Polarity: ' + allData[index].polarity;
        document.getElementById('polarity_confidence').innerHTML = 'Polarity Confidence: ' + polarityPercent
        document.getElementById('subjectivity').innerHTML = 'Subjectivity:\n ' + allData[index].subjectivity;
        document.getElementById('subjectivity_confidence').innerHTML = 'Subjectivity Confidence: ' + subjectivityPercent
        document.getElementById('text').innerHTML = 'Sample text: ' + allData[index].text;
   
      
      } catch (error) {
        console.log("error", error);
      }
}

function makePercent(decimal) {
  let percent = decimal * 100
  return percent.toFixed(2) + '%'
}

export { handleSubmit, makePercent }