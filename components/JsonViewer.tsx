import { FormElementInstance } from '@/utils/types'
import React from 'react'
import ReactJson from 'react-json-view'

interface JsonViewerProps {
  jsonData: FormElementInstance[]
}

const JsonViewer: React.FC<JsonViewerProps> = ({ jsonData }) => {
  return (
    <div>
      <ReactJson
        src={jsonData}
        quotesOnKeys={false}
        displayDataTypes={false}
        displayObjectSize={false}
        enableClipboard={false}
      />
      {/**<pre>{JSON.stringify(jsonData, null, 2)}</pre> */}
    </div>
  )
}

export default JsonViewer
