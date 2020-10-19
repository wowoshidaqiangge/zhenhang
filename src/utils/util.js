export function export2Excel(columns, list, excelname) {
    require.ensure([], () => {
        const { export_json_to_excel } = require('../excel/Export2Excel');
        let tHeader = [];
        let filterVal = [];
        console.log(columns);
        if (!columns) {
            return;
        }
        columns.forEach(item => {
            tHeader.push(item.label);
            filterVal.push(item.prop);
        });
        const data = list.map(v => filterVal.map(j => v[j]));
        export_json_to_excel(tHeader, data, excelname);
    });
}
export function getBlob(url) {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve(xhr.response);
        }
      };
      xhr.send();
    });
  }
  // 修改下载文件名称
  export function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      var link = document.createElement('a');
      var body = document.querySelector('body');
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      // fix Firefox
      link.style.display = 'none';
      body.appendChild;
      link.click();
      body.removeChild;
      window.URL.revokeObjectURL(link.href);
    }
  }
export function sessionSetStore(name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
}

export function sessionGetStore(name) {
    if (!name) return;
    return window.sessionStorage.getItem(name);
}

export function sessionRemoveStore(name) {
    if (!name) return;
    window.sessionStorage.removeItem(name);
}
