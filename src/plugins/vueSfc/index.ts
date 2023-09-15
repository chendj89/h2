const sfc = () => {
  return {
    name: 'sfc',
    transform(code, id) {
      console.log('id', id)
      if (!/vue&type=cc/.test(id)) {
        return
      }
      if (/\.chencc$/.test(id)) {
        code = `{}`
      }
      console.log('code', code)

      return `export default Comp=>{
                  Comp.cc=${code}
              }`
    }
  }
}
export default sfc
