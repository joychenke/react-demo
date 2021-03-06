import React from 'react'
function FancBorder(props) {
  return (<div className={'FancyBorder FancyBorder-'+props.color}>
    {props.children}
  </div>);
}
function SplitPane(props) {
  return (
    <div className="splitpane">
      <div className="splitpane-left">
        {props.left}
      </div>
      {props.children}
      <div className="splitpane-right">
        {props.right}
      </div>
      
    </div>
  );
}
function WelcomeDialog() {
  return (
    <FancBorder color="red">
      <h1>red</h1>
      <h1 className="Dialog-title">welcome</h1>
      <p className="Dialog-message">Thank you for visting our spacecraft!</p>
    </FancBorder>
  );
}

export class Combination extends React.Component {
  render() {
    const leftObj = <h1>left left left</h1>
    const rightObj = <h2>right right right</h2>
    return (
      <div>
        <WelcomeDialog/>
        <SplitPane left={leftObj} right={rightObj}>
          <div className="splitpane-middle">
            通过props.children插入的<b>内容</b>
          </div>
        </SplitPane>
      </div>
    );
  }
}