import './Tabs.css';
import React, { useState } from 'react'

export const Tabs = props => {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const switchTab = tab => setActiveTab(tab);

  let content;
  let labels = [];

  return (
    <div>
      { React.Children.map(props.children, tab => {
        labels.push(tab.props.label);

        if (tab.props.label === activeTab) 
          content = tab.props.children
      })}

      <TabButtons labels={ labels } switchTab={ switchTab } activeTab={ activeTab }/>
      <div>{ content }</div>
    </div>
  )
};

const TabButtons = props => {
  return (
    <div className="tab-btns-flex">
    { props.labels.map(label => (
      <div className={`tab-btn ${label === props.activeTab ? "active" : ""}`} onClick={ () => props.switchTab(label) }>
        { label }
      </div> 
    ))}
    </div>
  )
};

export const Tab = props => {
  return (
    <React.Fragment>
      { props.children }
    </React.Fragment>
  )
};