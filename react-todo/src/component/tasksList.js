import React, { Component, Fragment } from "react";
import './task.css';
class task extends Component {





    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isChecked: false }
            this.handleChecked = this.handleChecked.bind(this);
       



        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this);

    }

    handleChecked() {
        this.setState({ isChecked: !this.state.isChecked });
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




    onSubmit(e,id) {
       
        e.preventDefault();
        fetch("http://localhost:3001/task/update/" +id , {
            "method": "PUT",
            "headers": {
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                description: this.state.description,
               
            })
        })
            .then(response => response.text())
            .then(response => {
                console.log(response)
                window.location.reload();



                //  localStorage.setItem('usertoken', response)
                // this.props.history.push('/profile')

             
            })
            .catch(err => {
                console.log(err);
            });
    }



    
    done(e, id) {

        e.preventDefault();
        fetch("http://localhost:3001/task/isDone/" + id, {
            "method": "PUT",
            "headers": {
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "accept": "application/json",
                "Content-Type": "application/json",
            },
            "body": JSON.stringify({
                isDone:true,

            })
        })
            .then(response => response.text())
            .then(response => {
                console.log(response)


                //  localStorage.setItem('usertoken', response)
                // this.props.history.push('/profile')


            })
            .catch(err => {
                console.log(err);
            });
    }

    handleChange(changeObject) {
        this.setState(changeObject)
    }

    delete(e, id) {
        e.preventDefault();
        fetch("http://localhost:3001/task/delete/" + id, {
            "method": "DELETE",

            "headers": {
                "x-rapidapi-host": "fairestdb.p.rapidapi.com",
                "accept": "application/json",
                "Content-Type": "application/json",
            },

        })
            //console.log(id)

            .then(response => response.text())
            .then(response => {
                console.log(response)
                window.location.reload();


                // this.props.history.push('/profile')
            })
            .catch(err => {
                console.log(err);
            });
    }



    render() {
        if (this.state.isChecked) {
            console.log("hello")
        }
        const { items } = this.state;
        

        return (

            <>
               
                {items.map(item => (
                <Fragment key={item.id} >
                    <div className="container">
                   
                        <div class="list-group">
                            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">Task Title : {item.title}</h5><br />
                                    <h6 class="mb-1">checked</h6>
                                </div>
                                <div class="col-sm-3 my-1">
                                        <button type="button" class="btn btn-danger" onClick={(e) => this.delete(e, item.id)}>Delete Task</button>
                                </div>
                                <div class="form-row align-items-center">
                                    <div class="col-sm-3 my-1">
                                        </div><input type="text" class="taskinput" placeholder="add new tag"
                                            value={this.state.description}
                                            onChange={(e) => this.handleChange({ description: e.target.value })}
                                        />
                                        
                                        <small class="mb-1">{item.description}</small>
                                        <button type="submit" class="addTag" onClick={(e) => this.onSubmit(e, item.id)}>Add a Tag</button>
                                        <input type="checkbox" class="tagcheckbox" onChange={(e) => this.done(e, item.id)}
                                          ></input>
                                </div>
                            </a>
                        </div>

                    </div>
                    </Fragment>))}



            </>

        );
    };
}
export default task;