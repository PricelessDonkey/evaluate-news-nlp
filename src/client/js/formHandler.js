function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let userEntry = document.getElementById('name').value
    Client.checkForName(userEntry) // check for valid URL first
    
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
    
    const request = await fetch('http://localhost:8080/all');
    try {
        console.log('request: ' + request);
        const allData = await request.json();
        console.log('allData: ' + allData);

        const index = allData.length - 1;
        
     
        document.getElementById('results').innerHTML = allData[index].polarity;
      
      } catch (error) {
        console.log("error", error);
      }
}

export { handleSubmit }