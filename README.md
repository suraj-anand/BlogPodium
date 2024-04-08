# BLOG PODIUM

### Video Demo:  [Click Here](https://youtu.be/FnNx0iEwhZk)

Welcome to BlogPodium, your one-stop destination for discovering and sharing the best podcasts and blogs across various topics.

We understand the power of storytelling and knowledge sharing, and our platform aims to connect enthusiasts, creators, and learners alike. Whether you're a podcast aficionado, a blogging enthusiast, or someone looking to explore new ideas and perspectives, we've got you covered.

## With BLOG PODIUM, you can:

- Stay productive & not get side tracked on unwanted videos, ads and endless scrolling.

- Create & Share your thoughts and ideas through blogs & podcasts to the world.

- Connect with fellow enthusiasts and creators, fostering meaningful conversations and collaborations.

- Share your favorite podcasts and blogs with your network, amplifying voices and spreading knowledge.

- Explore curated content tailored to your interests, ensuring a personalized experience.

### Let's explore, learn, write, share and grow together!

<br />

# TECH STACK
- React.js
- Django
- DRF (django-rest-framework)
- SQLite


### Prerequisites

- python, pip, Node.js and npm installed on your machine.

### Installation / Configuration

1. Clone the repository:

   ```bash
   git clone https://github.com/suraj-anand/BlogPodium
   cd BlogPodium

1. Install Django Dependencies & Make sure your configs are set correctly
   
   ```bash
   pip install -r requirements.txt

1. Its required to have to .env files, one on the client folder and the other one on the project root folder 
   
   - Content for the client/.env file is a URL that maps to the server hosted location,
   
   ## client/.env
   ```
   VITE_BASE_URL=http://localhost:8000/
   ```

   ## .env
   - Content for the /.env file is a SECRET_KEY for the django-server & JWT_SECRET (json-web-token-secret) which is used to encrypt user cookies.
   
   ```
    SECRET_KEY=''
    JWT_SECRET=''
   ```

1. Start django server

    ```
    python manage.py runserver

1. Start client dev or create a client build

    -- To Start client dev server
    ```bash
    cd client
    npm run start
    ```

    -- To Create client build
    
    ```bash
    cd client
    npm run build
    ```

1. Open Browser and access expense-tracker web-app on the following URL
    
    ```
        http://localhost:8000/
    ```