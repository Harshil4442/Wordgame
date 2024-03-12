# Wordgame

<br />
<p align="center">

  <p align="center">
    <br />
    <a href="https://github.com/Harshil4442/Wordgame/issues">Report Bug</a>
    ·
    <a href="https://github.com/Harshil4442/Wordgame/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary >
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

- Welcome to the Word Game project, an interactive and engaging online game where users can join together in rooms to unleash their creativity and guessing skills! In this game, players take turns drawing a given word while others attempt to guess the correct word based on the drawing.<br/><br/>


### Features

- **Real-time Collaboration:** This game works in real time beacause multiple users will be selecting and guessing the word in real time. Also the scoring system will work in real time.<br/>
- **Drawing Mechanism:** There is drawing features in this project in which there are four types of tools: pencil, reactangle, circle and erase. Here i have used React Konva for the page of the drawing and that tools.<br/>
- **Room Creation and Joining:** Users can join the room by giving their username and roomID. If entered roomID is currently existing then user will be assign that room but if that roomID is not exist a new room with that roomID will be created for that user. <br />
- **Guessing Mechanism:** Player who guessed word correctly will get points. A user who guess correct word early will get more points. <br/>
- **Database Integration:** We have created database in which we store username, roomID, current user points etc.<br/>



### Built With

* [Socket.io](https://socket.io/)
* [MongoDB](https://www.mongodb.com/)
* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/)
* [ReactJS](https://reactjs.org/)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation


Fork, then download or clone the repo.
```bash
git clone https://github.com/Harshil4442/Wordgame.git
```

For the **back-end**, install the dependencies once via the terminal.
```bash
cd reactjs/server
npm install
```

Create .env file in Backend folder and set the below code.
```bash
FRONTEND_URL = 
MONGODB_URL =
PORT =
```

If you want to run the **back-end**, go to *backtend* folder via the terminal.
```bash
npm run start
```

For the **front-end**, install the dependencies once via the terminal.
```bash
cd reactjs
npm install
```

If you want to run the **front-end**, go to *frontend* folder via the terminal.
```bash
npm run dev
```

Now you are ready to run the server and frontend.

<br />

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- CONTACT -->
## Contact

Harshil Savaliya - [@Harshil Savaliya](https://www.linkedin.com/in/harshil-savaliya-3a7460223/) - harshilyogeshbhai886@gmail.com

Project Link: [https://github.com/Harshil4442/Wordgame](https://github.com/Harshil4442/Wordgame)