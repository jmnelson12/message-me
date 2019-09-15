import React, { useState, useEffect } from "react";
import "../../styles/Sidebar.css";

const c = [
    {
        firstName: "John",
        lastName: "Doe",
        organizatin: "Google",
        isOnline: true,
        chatroomId: 12312
    },
    {
        firstName: "Jane",
        lastName: "Tassy",
        organizatin: "n/a",
        isOnline: false,
        chatroomId: 12311
    },
    {
        firstName: "Test",
        lastName: "Nelson",
        organizatin: "Microsoft",
        isOnline: true,
        chatroomId: 12323
    }
]

export default function Contacts() {
    const cList = c.map(o => (
        <div key={o.chatroomId} className="contact">
            <div className="info">
                <p className="name">{o.firstName + " " + o.lastName}</p>
                <p className="org">{o.organizatin}</p>
            </div>
            <div className="status">
                {
                    o.isOnline ?
                        <div className="online">
                            online
                    </div> :
                        <div className="offline">
                            offline
                    </div>
                }
            </div>
        </div>
    ));

    return (
        <div className="admin-contact-list">
            {
                cList
            }
        </div>
    )
}
