import { Logo } from "components"
import Navbar from "components/shared/Navbar"
import { Link } from "react-router-dom"

const About = () => {
  return (
        <>
        <Navbar type="back" />
        <div className="bg-gray-100">
            <div className="container mx-auto py-12 px-4">

                <h1 className="text-3xl font-bold mb-6 text-center">About <Logo className={"text-blue-800 mx-2"} /></h1>

                <div className="max-w-3xl mx-auto text-lg">
                    
                    <p className="mb-4 leading-8 text-justify">Welcome to BlogPodium, your one-stop destination for discovering and sharing
                        the best podcasts and blogs across various topics.
                    </p>

                    <p className="mb-4 leading-8 text-justify">
                        We understand the power of storytelling and knowledge sharing, and our platform aims to
                        connect enthusiasts, creators, and learners alike. Whether {"you're"} a podcast aficionado, a blogging
                        enthusiast, or someone looking to explore new ideas and perspectives, {"we've"} got you covered.
                    </p>

                    <p className="fw-bold mb-4">With <Logo className={"text-blue-800 p-1"} />, you can:</p>

                    <ul className="list-disc gap-3 flex flex-col">
                        <li>Stay productive & not get side tracked on unwanted videos, ads and endless scrolling.</li>
                        <li>Create & Share your thoughts and ideas through blogs & podcasts to the world.</li>
                        <li>Connect with fellow enthusiasts and creators, fostering meaningful conversations and
                            collaborations.</li>
                        <li>Share your favorite podcasts and blogs with your network, amplifying voices and spreading knowledge.</li>
                        <li>Explore curated content tailored to your interests, ensuring a personalized experience.</li>
                    </ul>

                    <p className="mt-5 mb-3">
                        Join us by creating an account with us <Link to="/register/" className="text-slate-500 fw-bold">Click here to create your account</Link>.
                    </p>
                    <p> {"Let's"} explore, learn, write, share and grow together! </p>
                </div>
            </div>
        </div>
        </>
  )
}

export default About