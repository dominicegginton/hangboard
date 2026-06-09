// Notes:
// - Filename should start with 'ext'
// - Replace UUIDs with correct ones
//
// Register service and characteristic UUIDs for notifications
//
function(conn) {
  appConn.regUuid(conn,
    0, // ID to refer this characteristic later
    [0,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1], // Service UUID 01020304-0506-0708-090A-0B0C0D0E0F00 (little-endian)
    [1,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]  // Characteristic 01020304-0506-0708-090A-0B0C0D0E0F01
  );
}
