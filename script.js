//Object to represent the item widget
function repoObject(rName,rDesc,sCount,lData)
{
    this.repoName = rName
    this.repoDescription = rDesc
    this.starCount = sCount
    this.languageData = lData
}

async function start(bar)
{
    let username = bar
    let infoArray = []

    //Generating required json files
    let user = await fetch(`https://api.github.com/users/${username}`)
    let repo = await fetch(`https://api.github.com/users/${username}/repos`)
    let userData = await user.json()
    let repoData = await repo.json()

    //Creates an array of objects containing project name and description
    for(key in repoData)
    {
        let languages = await fetch(repoData[key].languages_url)
        let languageData = await languages.json()
        let languageArray = []

        for(i in languageData)
            languageArray.push(i)

        let rObject = new repoObject(repoData[key].full_name.slice(username.length+1),
                                     repoData[key].description,
                                     repoData[key].stargazers_count,
                                     languageArray)
        
        infoArray.push(rObject)
        console.log(infoArray[key].languageData)
    }

    // Required info for cv header
    let followerCount = userData.followers
    let followingCount = userData.following
    let location = userData.location
    let repoCount = userData.public_repos
    let imageUrl = userData.avatar_url
    let email = userData.email
}

function search()
{
    let bar = document.getElementById("userNameInputBar").value
    if(bar=="")
        alert("Please enter a username");
    else
        start(bar)
}

