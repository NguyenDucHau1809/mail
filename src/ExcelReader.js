import React, { Component } from 'react';
import XLSX from 'xlsx';
import { make_cols } from './MakeColumns';
import { SheetJSFT } from './types';
import getAction from './redux/action';
import {connect} from 'react-redux'

export class ExcelReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
      cols: []
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };
 
  handleFile() {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
 
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array', bookVBA : true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws);
      /* Update state */
      this.setState({ data: data, cols: make_cols(ws['!ref']) }, () => {
      console.log(JSON.stringify(this.state.data, null, 2));
      });
    };
 
    if (rABS) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }

  render() {
  //  console.log(JSON.stringify(this.props))
    // var listItems = this.state.data.map(e => (
    //       <tr key={e.TT}>
    //         <td><b key={e.TT}>{JSON.stringify(e.TT)}</b></td>
    //         <td><b key={e.TT}>{JSON.stringify(e.mail)}</b></td>
    //         <td><input type='checkbox' value={e.mail} onChange={()=>{
              
    //         }}></input></td>
    //       </tr>
    // ));
    // var comboxBoxItem = this.state.data.map(e => (
    //   <option value={e.TT} key={e.TT}>{e.TT}</option>
    // ));
    console.log('data', this.state.data);
    
    return (
      <div>
        <label htmlFor="file">Upload an excel to Process Triggers</label>
        <br />
        <input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={this.handleChange} />
        <br />
        <input type='submit' 
          value="Process Triggers"
          onClick={this.handleFile}/>
        {/* <table style={{width: '50%'}}>
          <tbody>
            <tr>
              <td>STT</td>
              <td>Mail</td>
              <td>Chọn</td>
            </tr>
              {listItems}
          </tbody>
        </table> */}
        {/* <select>
          {comboxBoxItem}
        </select> */}
        {/* <div>
          <textarea placeholder='nhập nội dung email' style={{width: '50%', height: '40%'}}></textarea>
        </div> */}
        <button onClick = {() => {
          let customers = this.state.data
          // this.state.data.map(vl => {
          //   customers.push(vl.email)
          // })
          console.log(customers)
          this.props.sendMail({subject: 'test', text :'test noi dung',listCustomers: customers, filename: [], buffer: null,  })
        }}>Gửi mail</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
      
  }
}

const mapDispatchToProps = dispatch => {
  return{
      sendMail: (mail) => {
          dispatch(getAction.action.sendMail(mail));
      },
  }
}
export default connect( mapStateToProps, mapDispatchToProps )( ExcelReader )