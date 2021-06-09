import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import { useDispatch } from 'react-redux'
import { render } from 'react-dom';
import DemoReadFile from '../Component/URL/DemoReadFile';
import axios from 'axios';
import { notification } from 'antd';

/**
 * 
 * @author DuongDT 19
 * 
 * @version 1.0
 * 
 * @Date 2/6/2021
 * 
 * 
 * Modification Logs:
 * 
 * Date				AUTHOR 				DESCRIPTION
 * ------------------------------------------------------
 * 2/6/2021			DuongDT19			Create
 *
 */
notification.config({
  placement: 'topRight',
  top: 100,
  duration: 7,
});

const fooParent = (data) => {
  if (data.column.length == 4) {
    if (data.column[0].name == "STT"
      && data.column[1].name == "malop"
      && data.column[2].name == "mem_ber"
      && data.column[3].name == "name_class") {
      axios.post("http://localhost:8888/UploadFile", {
        data: JSON.stringify(data.list)
      }).then(
        (result) => {
          const msg = result.data.data+"\t/\t"+data.list.length+"\tUpload Success !!";
          notification.success({
            message: msg,
          });
          
      },
      (error) => {
          console.log("Error: " + error);
      },
      )
    } else {
      notification.error({
        message: "File invalidate !!",
      });
    }
  } else {
    notification.error({
      message: "File invalidate !!",
    });

  }
}
export const filehandler = (file) => {
  const reader = new FileReader();
  reader.onload = (evt) => {
    /* Parse data */
    const bstr = (evt.target as any).result;
    const wb = XLSX.read(bstr, { type: 'binary' });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const data = XLSX.utils.sheet_to_csv(ws, { header: 1 } as any);
    const list = processData(data);
    fooParent(list);
  };
  reader.readAsBinaryString(file);

}
const processData = dataString => {
  const dataStringLines = dataString.split(/\r\n|\n/);
  const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

  const list: any[] = [];
  for (let i = 1; i < dataStringLines.length; i++) {
    const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
    if (headers && row.length == headers.length) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        let d = row[j];
        if (d.length > 0) {
          if (d[0] == '"')
            d = d.substring(1, d.length - 1);
          if (d[d.length - 1] == '"')
            d = d.substring(d.length - 2, 1);
        }
        if (headers[j]) {
          obj[headers[j]] = d;
        }
      }
      if (Object.values(obj).filter(x => x).length > 0) {
        list.push(obj);
      }
    }
  }
  const columns = headers.map(c => ({
    name: c,
    selector: c,
  }));
  const data = {
    list: (list as any),
    column: columns
  }
  return data
}
