const sfc = () => {
  return {
    name: 'sfc',
    transform(code, id) {
      if (!/vue&type=cc/.test(id)) {
        return
      }
      if (/\.chencc$/.test(id)) {
        return `export default Comp=>{
          Comp.cc=${code}
      }`
      }
    }
  }
}
export default sfc
