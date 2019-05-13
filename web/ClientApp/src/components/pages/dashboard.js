
import React, { Component } from 'react';
import { Card, Grid, Icon, Image } from 'semantic-ui-react';


export default class Dashboard extends Component {
    displayName = Dashboard.name

    componentDidMount() {

    }

    render() {
        return (
            <Grid columns='equal'>
                <Grid.Row stretched>
                    <Grid.Column>
                        <Card>
                            <Card.Content>
                                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                                <Card.Header>Project A</Card.Header>
                                <Card.Meta>PO: Elliot</Card.Meta>
                                <Card.Description>
                                    A line about the project
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                    Info
      </a>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Card.Content>
                                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                                <Card.Header>Project B</Card.Header>
                                <Card.Meta>PO: Somebody</Card.Meta>
                                <Card.Description>
                                    A line about the project
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra>
                                <a>
                                    <Icon name='user' />
                                  Info
      </a>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <div></div>
                    </Grid.Column>
             
                </Grid.Row>
                
            </Grid>
        );
    }
}
