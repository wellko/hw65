import React, {useCallback, useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {ApiInfo} from "../../types";
import axiosApi from "../../axios-api";

const NavBar = () => {
    const [page, setPage] = useState<ApiInfo[]>([]);

    const fetchHeroes = useCallback(async  () => {
            try {
                const response  = await axiosApi('/pages.json');
                let heroes = [];
                if (response){
                    heroes = Object.keys(response.data).map(key => {
                        return response.data[key]
                    })
                    setPage(heroes);
                }
            }finally {

            }
        }, []
    );

    useEffect(()=>{
        fetchHeroes().catch(console.error);
    }, [fetchHeroes]);


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container-fluid">
                <NavLink to='/' className="navbar-brand">Home</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to='/pages/admin' className="nav-link">Edit</NavLink>
                        </li>
                        {page.map(item => ( <li key={Math.random()} className="nav-item">
                            <NavLink to={'/pages/' + item.title} className="nav-link">{item.title}</NavLink>
                        </li>))}

                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;