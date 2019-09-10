import React from 'react';

export default function About() {
    return (
        <div className="aboutMe">
            <div className="heading">
                <h3>Hi, I'm Jacob Nelson.</h3>
            </div>
            <div className="profileImage">
                <img src="/images/me.jpg" alt="Jacob Nelson" />
            </div>
            <div className="info">
                <p>
                    I'm a Web Developer Intern for Larson Manufacturing and formerly a Student Programmer for South Dakota State University. I'm a Senior at Dakota State University in Madison, SD. I am majoring in Computer Information Systems specializing in Web Development.
                    <br /><br />
                    I'm super passionate about web development and learning the Full Stack. Currently, I spend most of my time working and learning with the MERN (Mongodb, Expressjs, Reactjs, and Nodejs) stack.
                </p>
            </div>
        </div>
    )
}
