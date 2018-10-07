import React from 'react';
import { connect } from 'react-redux';
import { SketchPicker } from 'react-color';

import { List, Avatar, Divider } from 'antd';


const IncidentDetails = ({ incidentType }) => {
    console.log(incidentType);
    return incidentType ? (
        <div className="content scrollable">
            <List
                itemLayout="horizontal"
                dataSource={ incidentType}
                renderItem={({ name, code, family, description, color, nature }) => (
                    <List.Item className="p-20">
                        <List.Item.Meta
                            avatar={<Avatar
                                style={{
                                    backgroundColor: color,
                                    verticalAlign: 'middle'
                                }} size="large">
                                {name.charAt(0)}
                            </Avatar>}
                            title={<div>
                                <span className="f-600 f-15">
                                    {name}
                                </span>
                                <Divider />
                            </div>
                            }
                            description={

                                <div>
                                    <h3><span style={{color:"#1890ff", paddingRight: "10px"}}>Nature:</span> {nature}</h3>
                                    <h4><span style={{color:"#1890ff", paddingRight: "10px"}}>Family:</span> {family} </h4>
                                    <Divider />
                                    <h3><span style={{color:"#1890ff", paddingRight: "10px"}}>Code:</span> {code.given}</h3>
                                    <h4><span style={{color:"#1890ff", paddingRight: "10px"}}>System:</span> {code.cap}</h4>
                                    <h3><span style={{color:"#1890ff", paddingRight: "10px"}}>CAP: </span>Version 1.2.0</h3>
                                    <Divider />
                                    <h3><span style={{color:"#1890ff", paddingRight: "10px",
                                }}>Description</span></h3>
                                    <p>{description}</p>
                                    <Divider />
                                    <div>
                                    <SketchPicker color={color}/>
                                    
                                    </div>
                                
                                </div>
                            } />
                    </List.Item>
                )}
            />
        </div>
    ) : (<h1> Waiting for data</h1>)
}

const mapStateToProps = state => {

    return{
        incidentType: state.incidentsType.incidentType ? [state.incidentsType.incidentType] : []
    }

};
 
export default connect(mapStateToProps)(IncidentDetails)