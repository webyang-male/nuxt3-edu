export default (params) => `<!DOCTYPE html>
<html ${params.HTML_ATTRS}>

<head ${params.HEAD_ATTRS}>
  ${params.HEAD}
</head>

<body ${params.BODY_ATTRS}>${params.BODY_PREPEND}
  ${params.APP}
</body>

</html>`
