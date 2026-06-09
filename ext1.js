// Notes:
// - Filename should start with 'ext'
// - Replace UUIDs with correct ones
//
// Connect to BLE device
//
function(evHandler) {
  return appConn.connect( // appConn: System object for connection handling,
    enabledZappId, // Id of the app set by the system
    evHandler, // BLE event handler defined in the main.js

    // 1st byte indicates from which advertised field following bytes are searched.
    // e.g.
    // 2: From partial list of 16 bit service UUIDs.
    // 3: Complete list of 16 bit.
    // 4: Partial list of 32 bit.
    // 5: Complete list of 32 bit.
    // 6: Partial list of 128 bit.
    // 7: Complete list of 128 bit.
    // 255: Manufacturer Specific Data.

    // Search UUID 01020304-0506-0708-090A-0B0C0D0E0F00 (little-endian)
    // from partial and complete lists (128 bit).
    [6, 0,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1],
    [7, 0,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1]
  );
}
