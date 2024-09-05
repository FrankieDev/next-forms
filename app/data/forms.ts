const forms = [
  {
    id: 1,
    display: 'form',
    components: [
      {
        label: 'Text Field',
        placeholder: 'Placeholder',
        validate: {
          required: true
        },
        fieldName: 'nombre',
        type: 'textfield',
        input: true
      },
      {
        label: 'Email',
        fieldName: 'email',
        type: 'email',
        input: true
      },
      {
        label: 'Text Area',
        fieldName: 'textArea',
        type: 'textarea',
        input: true
      },
      {
        label: 'Subir archivo x',
        tableView: false,
        webcam: false,
        capture: false,
        fileTypes: [
          {
            label: '',
            value: ''
          }
        ],
        fileMinSize: '1KB',
        fileMaxSize: '1MB',
        fieldName: 'subirArchivoX',
        type: 'file',
        input: true
      },
      {
        label: 'Select',
        description: 'Selector',
        data: {
          values: [
            {
              label: 'uno',
              value: '1'
            },
            {
              label: 'dos',
              value: '2'
            }
          ]
        },
        dataType: 'number',
        fieldName: 'selectores',
        type: 'select',
        input: true
      },
      {
        type: 'button',
        label: 'Submit',
        fieldName: 'submit',
        input: true
      }
    ]
  }
]

export { forms }
