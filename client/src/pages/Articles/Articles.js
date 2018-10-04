import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/SaveBtn/SaveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import nytAPI from "../../utils/nytAPI";
import "./styles.css";

class Articles extends Component {
  state = {
    title: "",
    firstYear: "",
    lastYear: "",
    saved: [],
    articles: []
  };

  componentDidMount() {
    this.loadSaved();
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  deleteArticle = event => {
    API.deleteArticle(event.target.id)
    .then(res => {
      this.loadSaved();
    })
  }

  handleClickArticles = event => {
    event.preventDefault();
    let q = this.state.title;
    let firstYear = this.state.firstYear;
    let lastYear = this.state.lastYear;

    nytAPI.retrieveArticles(q, firstYear, lastYear)
      .then(res => {
        this.setState({ articles: res });
        console.log(this.state.articles);
      })
      .catch(err => console.log(err));
  }

  loadSaved = () => {
    API.getArticles()
      .then(res => this.setState({ saved: res.data }))
      .catch(err => console.log(err));
  };

  handleClickSaved = event => {
    event.preventDefault();

    API.saveArticle({ title: event.target.getAttribute("title"), date: event.target.getAttribute("date"), url: event.target.getAttribute("url") })
      .then(res => {
        this.loadSaved();
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-2"></Col>
          <Col size="md-8">
            <Jumbotron>
              <h1 className="siteTitle">New York Times Search</h1>
            </Jumbotron>
            <form>
              <Input name="title" placeholder="Title" onChange={this.handleInputChange} />
              <Input name="firstYear" placeholder="First Year" onChange={this.handleInputChange} />
              <Input name="lastYear" placeholder="Last Year" onChange={this.handleInputChange} />
              <FormBtn onClick={this.handleClickArticles}>Search</FormBtn>
            </form>
          </Col>

        </Row>

        <Row>
          <Col size="md-2"></Col>
          <Col size="md-8 sm-12">

            {/* Insert ajax articles here */}
            <h1 className="headings">Articles</h1>
            <List>
              {this.state.articles.map(articles => (
                <ListItem key={articles._id}>
                  {articles.pub_date}
                  <a href={articles.web_url}>
                    <strong>
                      {articles.snippet}
                    </strong>
                  </a>
                  <SaveBtn title={articles.snippet} url={articles.web_url} date={articles.pub_date} onClick={this.handleClickSaved} />
                </ListItem>
              ))}
            </List>

            <h1 className="headings">Saved Articles</h1>
            {this.state.saved.length ? (
              <List>
                {this.state.saved.map(articles => (
                  <ListItem key={articles._id}>
                    {articles.date}
                    <a href={articles.url}>
                      <strong>
                        {articles.title}
                      </strong>
                    </a>
                    <DeleteBtn id={articles._id} onClick={this.deleteArticle}/>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3 className="headings">No Results to Display</h3>
              )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
