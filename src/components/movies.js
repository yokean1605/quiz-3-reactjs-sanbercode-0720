import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from './context'

const Movies = () => {
    const [status, setStatus, movies, setMovies] = useContext(Context)
    const [input, setInput] = useState({
        title: "",
        description: "",
        year: 0,
        duration: 0,
        genre: "",
        rating: 0
    })
    const [statusForm, setStatusForm] = useState("create")
    const [selectId, setSelectedId] = useState(0)

    useEffect(() => {
        if (movies === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
                .then(res => {
                    setMovies(res.data.map(el => {
                        return {
                            id: el.id, title: el.title, description: el.description, year: el.year, duration: el.duration,
                            genre: el.genre, rating: el.rating
                        }
                    }))
                })
        }
    }, [movies])

    const handleDelete = (e) => {
        let id = Number(e.target.value)

        let NewMovie = movies.filter(el => el.id !== id)

        axios.delete(` http://backendexample.sanbercloud.com/api/movies/${id}`)
            .then(res => {
                console.log(res)
            })
        setMovies([...NewMovie])
    }

    const handleEdit = (e) => {
        let id = Number(e.target.value)
        let movie = movies.find(x => x.id === id)

        setInput({ title: movie.title, description: movie.description, year: movie.year, duration: movie.duration, genre: movie.genre, rating: movie.rating })
        setSelectedId(id)
        setStatusForm("edit")
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleValidation = () => {
        let error = ''

        //validation title
        if (input['title'].replace(/\s/g, '') === "" || typeof input['title'] !== "string") {
            error += `Title : Error data type or can't be empty\n`
        }

        //validation description
        if (input['description'].replace(/\s/g, '') === "") {
            error += `Description : Error cant be empty \n`
        }

        //validation year
        input['year'] = Number(input['year'])
        if (input['year'] === 0 || typeof input['year'] !== "number") {
            error += `Year : Error data type or can't be empty \n`
        }

        //validation duration 
        input['duration'] = Number(input['duration'])
        if (input['duration'] === 0 || typeof input['duration'] !== "number") {
            error += `Duration : Error data type or can't be empty \n`
        }

        //validation genre  
        if (input['genre'].replace(/\s/g, '') === "" || typeof input['genre'] !== "string") {
            error += `Genre : Error data type or can't be empty \n`
        }

        //validation rating
        input['rating'] = Number(input['rating'])
        if (input['rating'] === 0 || typeof input['rating'] !== "number" || input['rating'] < 0 || input['rating'] > 10) {
            error += `Rating : Error data type (1-10) or can't be empty \n`
        }

        return error
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let error = handleValidation()
        if (!error) {
            if (statusForm === "create") {
                axios.post(`http://backendexample.sanbercloud.com/api/movies`, input)
                    .then(res => {
                        setMovies([...movies, {
                            id: res.data.id, title: res.data.title, description: res.data.description, year: res.data.year, duration: res.data.duration,
                            genre: res.data.genre, rating: res.data.rating
                        }])
                    })
            } else if (statusForm === "edit") {
                axios.put(`http://backendexample.sanbercloud.com/api/movies/${selectId}`, input)
                    .then(res => {
                        let movie = movies.find(el => el.id === selectId)
                        movie['id'] = selectId
                        movie['title'] = input.title
                        movie['description'] = input.description
                        movie['year'] = input.year
                        movie['duration'] = input.duration
                        movie['genre'] = input.genre
                        movie['rating'] = input.rating
                        setMovies([...movies])
                    })
            }

            setStatusForm("create")
            setSelectedId(0)
            setInput({
                title: "",
                description: "",
                year: 0,
                duration: 0,
                genre: "",
                rating: 0
            })
        }
    }

    return (
        <>
            <div className="mt-50">
                <div className="mt-50" style={{ display: "flex", maxWidth: "90%", margin: "0 auto" }}>
                    <div style={{ backgroundColor: "white", padding: "10px", width: "30%" }}>
                        <h1 style={{ textAlign: "center", marginTop: '25px', marginBottom: '25px' }}>Form Movie</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label> Title : </label>
                                <input className="c-form-control" type="text" name='title' value={input.title} onChange={handleChange} placeholder="title" />
                            </div>
                            <div className="form-group">
                                <label> Year: </label>
                                <input className="c-form-control" type="text" name='year' value={input.year} onChange={handleChange} placeholder="ex:2000" />
                            </div>
                            <div className="form-group">
                                <label> Duration : </label>
                                <input className="c-form-control" type="text" name='duration' value={input.duration} onChange={handleChange} placeholder="duration in minutes" />
                            </div>
                            <div className="form-group">
                                <label> Genre : </label>
                                <input className="c-form-control" type="text" name='genre' value={input.genre} onChange={handleChange} placeholder="ex:drama,horror" />
                            </div>
                            <div className="form-group">
                                <label> Rating : </label>
                                <input className="c-form-control" type="number" name='rating' value={input.rating} onChange={handleChange} placeholder="rating from 1 to 10" />
                            </div>
                            <div className="form-group">
                                <label> Description: </label>
                                <textarea className="c-form-control" name='description' value={input.description} onChange={handleChange} placeholder="description" rows="10" />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary"> submit</button>
                        </form>
                    </div>
                    <div style={{ backgroundColor: "white", padding: "10px" }}>
                        <h1>List Movie</h1>
                        <table className="table-list-movies">
                            <thead >
                                <tr>
                                    <th> No </th>
                                    <th> Title </th>
                                    <th> Description </th>
                                    <th> Year </th>
                                    <th> Duration </th>
                                    <th> Genre </th>
                                    <th> Rating </th>
                                    <th> Action </th>
                                </tr>
                            </thead>
                            {movies !== null && movies.map((el, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{el.title}</td>
                                        <td>{el.description}</td>
                                        <td>{el.year}</td>
                                        <td>{el.duration}</td>
                                        <td>{el.genre}</td>
                                        <td>{el.rating}</td>
                                        <td>
                                            <button type="button" className="btn-edit" onClick={handleEdit} value={el.id}>Edit</button><br />
                                            <button type="button" className="btn-danger" onClick={handleDelete} value={el.id}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Movies;