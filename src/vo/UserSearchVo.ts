interface User {
    avatar_url: string;
    login: string;
    html_url: string;
}

interface gitHubUserData {
    items: Array<object>
}

export {
    User, gitHubUserData
}