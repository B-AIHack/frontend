export const DataGridOverlay = ({ open, children, top }) => {
  const style = {
    position: 'absolute',
    top,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }

  return (
    <>
      {open && typeof top !== 'undefined' && top > 0 && (
        <div style={style}>{children}</div>
      )}
    </>
  )
}
