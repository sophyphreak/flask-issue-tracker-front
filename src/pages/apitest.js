import React, {useState, useEffect} from "react"
import { Link } from "gatsby"
import axios from 'axios'
import "./style.css"

const Apitest = () => {
  const [issueList, setIssueList] = useState("")

  const [newTitle, setNewTitle] = useState("")
  const [newText, setNewText] = useState("")
  const [newCreatedBy, setNewCreatedBy] = useState("")
  const [newAssignedTo, setNewAssignedTo] = useState("")
  const [newStatusText, setNewStatusText] = useState("")
  const [postResponse, setPostResponse] = useState("")

  useEffect( () => {    
    (async function fetchData() {
      try {
        const response = await axios.get('https://flask-issue-tracker.andrew-horn-portfolio.life/api/issues/apitest');
        setIssueList(response.data)
      } catch (e) {
        console.log(e)
      }
    })()
  });

  const handlePostIssue = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      "https://flask-issue-tracker.andrew-horn-portfolio.life/api/issues/apitest",
      {
        issue_title: newTitle,
        issue_text: newText,
        created_by: newCreatedBy,
        assigned_to: newAssignedTo,
        status_text: newStatusText,
      }
    )
    setNewTitle("")
    setNewText("")
    setNewCreatedBy("")
    setNewAssignedTo("")
    setNewStatusText("")
    setPostResponse(JSON.stringify(response.data))
  }

  const handleClose = async (e, _id, open) => {
    e.preventDefault()
    try {
      await axios.put('https://flask-issue-tracker.andrew-horn-portfolio.life/api/issues/apitest', {
        '_id': _id,
        'open': open
      }) 
    } catch (e) {
      console.log(e)
    }
  } 

  const handleDelete = async (e, _id) => {
    e.preventDefault()
    try {
      await axios.delete(`https://flask-issue-tracker.andrew-horn-portfolio.life/api/issues/apitest?_id=${_id}`)
    } catch (e) {
      console.log(e)
    }
  } 

  return (
    <div>
      <header>
        <h1 id="projectTitle"></h1>
      </header>
      <center>
        <div id="submitNewIssue">
          <br />
          <h3>Submit a new issue:</h3>
          <form id="newIssue" method="post" action="/api/">
            <input
              type="text"
              name="issue_title"
              placeholder="*Title"
              style={{ width: "320px", marginBottom: "3px" }}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <br />
            <textarea
              type="text"
              name="issue_text"
              placeholder="*Text"
              style={{ width: "320px", height: "100px" }}
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <br />
            <input
              type="text"
              name="created_by"
              placeholder="*Created by"
              style={{ width: "100px" }}
              value={newCreatedBy}
              onChange={(e) => setNewCreatedBy(e.target.value)}
            />
            <input
              type="text"
              name="assigned_to"
              placeholder="(opt)Assigned to"
              style={{ width: "100px" }}
              value={newAssignedTo}
              onChange={(e) => setNewAssignedTo(e.target.value)}
            />
            <input
              type="text"
              name="status_text"
              placeholder="(opt)Status text"
              style={{ width: "100px" }}
              value={newStatusText}
              onChange={(e) => setNewStatusText(e.target.value)}
            />
            <br />
            <button type="submit" onClick={handlePostIssue}>Submit Issue</button>
          </form>
          {postResponse && (
          <div>
            <p>
              <b>Response:</b>
            </p>
            <code>{postResponse}</code>
          </div>
        )}
        </div>

        {
          issueList && (
            issueList.map((issue, key) => (
              <div className={`issue ${issue.open || 'closed'}`} key={key}>
                <p className='id'>{issue._id}</p>
                <h3>{issue.issue_title} - {issue.open ? 'open' : 'closed'}</h3>
                <p>{issue.issue_text}</p>
                <p>{issue.status_text}</p>
            <p className="id"><b>Created by:</b> {issue.created_by} <b>Assigned to:</b> {issue.assigned_to}</p>
            <p className="id"><b>Created on:</b> {issue.created_on} <b>Last updated:</b> {issue.updated_on}</p>
            <a href="#" onClick={(e) => handleClose(e, issue._id, !issue.open)}>{issue.open ? 'close' : 'open'}?</a> <a href="#" onClick={e => handleDelete(e, issue._id)}>delete?</a>
              </div>
            )).reverse()
          )
        }

        <hr style={{ margin: "50px", marginTop: "200px" }} />
      </center>
    </div>
  )
}

export default Apitest
