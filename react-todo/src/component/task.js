import React, { Component, Fragment } from "react";
import './task.css';
import InputTask from "./tasksList";
class task extends Component {





    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };



        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);

    }



    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })

    }




   

    componentDidMount() {
        fetch('http://localhost:3001/task/all')
                .then(response => response.json())
                .then(items => this.setState({ items })).then(response => {
                    console.log(JSON.parse(response))

                }).catch(() => console.log("Can’t access " + 'http://localhost:3001/task/all' + " response. Blocked by browser?"))
 
  
}




    onSubmit(e) {



        e.preventDefault();
        fetch("http://localhost:3001/task/newTask", {
            "method": "POST",
            "headers": {
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                title: this.state.title,
            })
        })
            .then(response => response.text())
            .then(response => {
                console.log(response)
                window.location.reload();



            })
            .catch(err => {
                console.log(err);
            });
    }


    handleChange(changeObject) {
        this.setState(changeObject)
    }





    render() {

        return (

            <>
                <React.Fragment>
                    <form className="d-flex mt-5" noValidate onSubmit={this.onSubmit}>
                        <input type="title" className="form-control" value={this.state.title}
                            onChange={(e) => this.handleChange({ title: e.target.value })}
                            required
                        />
                        <button type="submit" className="btn btn-primary btn-block">add a task</button>
                    </form>
                </React.Fragment>


            <InputTask></InputTask>



            </>

        );
    };
}
export default task;