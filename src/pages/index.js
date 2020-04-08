import React, { useState } from "react"
import { Link } from "gatsby"
import axios from "axios"
import "./style.css"

const IndexPage = () => {
  const [newTitle, setNewTitle] = useState("")
  const [newText, setNewText] = useState("")
  const [newCreatedBy, setNewCreatedBy] = useState("")
  const [newAssignedTo, setNewAssignedTo] = useState("")
  const [newStatusText, setNewStatusText] = useState("")
  const [postResponse, setPostResponse] = useState("")

  const [updateId, setUpdateId] = useState("")
  const [updateTitle, setUpdateTitle] = useState("")
  const [updateText, setUpdateText] = useState("")
  const [updateCreatedBy, setUpdateCreatedBy] = useState("")
  const [updateAssignedTo, setUpdateAssignedTo] = useState("")
  const [updateStatusText, setUpdateStatusText] = useState("")
  const [updateOpen, setUpdateOpen] = useState(false)
  const [putResponse, setPutResponse] = useState("")

  const [deleteId, setDeleteId] = useState("")
  const [deleteResponse, setDeleteResponse] = useState("")

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

  const handlePutIssue = async (e) => {
    e.preventDefault()
    console.log(!updateOpen)
    const response = await axios.put(
      "https://flask-issue-tracker.andrew-horn-portfolio.life/api/issues/apitest",
      {
        _id: updateId,
        issue_title: updateTitle,
        issue_text: updateText,
        created_by: updateCreatedBy,
        assigned_to: updateAssignedTo,
        status_text: updateStatusText,
        open: !updateOpen
      }
    )
    setUpdateId('')
    setUpdateTitle("")
    setUpdateText("")
    setUpdateCreatedBy("")
    setUpdateAssignedTo("")
    setUpdateStatusText("")
    setUpdateOpen(false)
    setPutResponse(JSON.stringify(response.data))
  }

  const handleDeleteIssue = async (e) => {
    e.preventDefault()
    const response = await axios.delete(
      `https://flask-issue-tracker.andrew-horn-portfolio.life/api/issues/apitest?_id=${deleteId}`
    )
    setDeleteId("")
    setDeleteResponse(JSON.stringify(response.data))
  }

  return (
    <div>
      <header style={{ marginLeft: "5%", marginTop: "5%" }}>
        <h1>ISQA_4 - Issue Tracker</h1>
      </header>
      <div id="userstories" style={{ marginLeft: "5%", marginTop: "5%" }}>
        <h3>User Stories</h3>
        <ol>
          <li>Prevent cross site scripting(XSS attack).</li>
          <li>
            I can <b>POST</b> <code>/api/issues/{"{projectname}"}</code> with
            form data containing required <i>issue_title</i>, <i>issue_text</i>,{" "}
            <i>created_by</i>, and optional <i>assigned_to</i> and{" "}
            <i>status_text</i>.
          </li>
          <li>
            The object saved (and returned) will include all of those fields
            (blank for optional no input) and also include <i>created_on</i>
            (date/time), <i>updated_on</i>(date/time), <i>open</i>(boolean, true
            for open, false for closed), and <i>_id</i>.
          </li>
          <li>
            I can <b>PUT</b> <code>/api/issues/{"{projectname}"}</code> with a{" "}
            <i>_id</i> and any fields in the object with a value to object said
            object. Returned will be 'successfully updated' or 'could not update
            '+_id. This should always update <i>updated_on</i>. If no fields are
            sent return 'no updated field sent'.
          </li>
          <li>
            I can <b>DELETE</b> <code>/api/issues/{"{projectname}"}</code> with
            a <i>_id</i> to completely delete an issue. If no _id is sent return
            '_id error', success: 'deleted '+_id, failed: 'could not delete
            '+_id.
          </li>
          <li>
            I can <b>GET</b> <code>/api/issues/{"{projectname}"}</code> for an
            array of all issues on that specific project with all the
            information for each issue as was returned when posted.
          </li>
          <li>
            I can filter my get request by also passing along any field and
            value in the query(ie.{" "}
            <code>/api/issues/{"{project}"}?open=false</code>). I can pass along
            as many fields/values as I want.
          </li>
        </ol>
        <br />
        <h3>Example get usage:</h3>
        <code>/api/issues/{"{project}"}</code>
        <br />
        <code>/api/issues/{"{project}"}?open=true&amp;assigned_to=Joe</code>
        <br />
        <br />
        <h3>Example return:</h3>
        <code>
          {
            '[{"_id":"5871dda29faedc3491ff93bb","issue_title":"Fix error in posting data","issue_text":"When we post data it has an error.","created_on":"2017-01-08T06:35:14.240Z","updated_on":"2017-01-08T06:35:14.240Z","created_by":"Joe","assigned_to":"Joe","open":true,"status_text":"In QA"},...]'
          }
        </code>
        <br />
        <br />
        <h2>
          <Link to="/apitest/">
            EXAMPLE: Go to <i>/apitest/</i> project issues
          </Link>
        </h2>
      </div>
      <hr style={{ margin: "50px" }} />
      <div id="testui" style={{ marginLeft: "5%" }}>
        <h2 style={{ textAlign: "left" }}>API Tests:</h2>
        <h3>
          Submit issue on <i>apitest</i>
        </h3>
        <form id="testForm" className="border">
          <input
            type="text"
            name="issue_title"
            placeholder="*Title"
            style={{ width: "300px" }}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <br />
          <textarea
            type="text"
            name="issue_text"
            placeholder="*Text"
            style={{ width: "300px" }}
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="created_by"
            placeholder="*Created by"
            style={{ width: "300px" }}
            value={newCreatedBy}
            onChange={(e) => setNewCreatedBy(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="assigned_to"
            placeholder="(opt)Assigned to"
            style={{ width: "300px" }}
            value={newAssignedTo}
            onChange={(e) => setNewAssignedTo(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="status_text"
            placeholder="(opt)Status text"
            style={{ width: "300px" }}
            value={newStatusText}
            onChange={(e) => setNewStatusText(e.target.value)}
          />
          <br />
          <button type="submit" onClick={handlePostIssue}>
            Submit Issue
          </button>
        </form>
        {postResponse && (
          <div>
            <br />
            <p>
              <b>Response:</b>
            </p>
            <code>{postResponse}</code>
          </div>
        )}
        <br />
        <br />
        <h3>
          Update issue on <i>apitest</i> (Change any or all to update issue on
          the _id supplied)
        </h3>
        <form id="testForm2" className="border">
          <input
            type="text"
            name="_id"
            placeholder="*_id"
            style={{ width: "300px" }}
            required=""
            value={updateId}
            onChange={(e) => setUpdateId(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="issue_title"
            placeholder="(opt)Title"
            style={{ width: "300px" }}
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <br />
          <textarea
            type="text"
            name="issue_text"
            placeholder="(opt)Text"
            style={{ width: "300px" }}
            value={updateText}
            onChange={(e) => setUpdateText(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="created_by"
            placeholder="(opt)Created by"
            style={{ width: "300px" }}
            value={updateCreatedBy}
            onChange={(e) => setUpdateCreatedBy(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="assigned_to"
            placeholder="(opt)Assigned to"
            style={{ width: "300px" }}
            value={updateAssignedTo}
            onChange={(e) => setUpdateAssignedTo(e.target.value)}
          />
          <br />
          <input
            type="text"
            name="status_text"
            placeholder="(opt)Status text"
            style={{ width: "300px" }}
            value={updateStatusText}
            onChange={(e) => setUpdateStatusText(e.target.value)}
          />
          <br />
          <label>
            <input
              type="checkbox"
              name="open"
              checked={updateOpen}
              onChange={(e) => setUpdateOpen(e.target.checked)}
            />{" "}
            Check to close issue
          </label>
          <br />
          <button type="submit" onClick={handlePutIssue}>Submit Issue</button>
        </form>
        {putResponse && (
          <div>
            <br />
            <p>
              <b>Response:</b>
            </p>
            <code>{putResponse}</code>
          </div>
        )}
        <br />
        <br />
        <h3>
          Delete issue on <i>apitest</i>
        </h3>
        <form id="testForm2" className="border">
          <input
            type="text"
            name="_id"
            placeholder="_id"
            style={{ width: "300px" }}
            required=""
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
          />
          <br />
          <button type="submit" onClick={handleDeleteIssue}>Delete Issue</button>
        </form>
        {deleteResponse && (
          <div>
            <br />
            <p>
              <b>Response:</b>
            </p>
            <code>{deleteResponse}</code>
          </div>
        )}
        <br />
      </div>
      <hr style={{ margin: "50px", marginTop: "200px" }} />
    </div>
  )
}

export default IndexPage
