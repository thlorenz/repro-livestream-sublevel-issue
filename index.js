var level = require('level')
  , sublevel = require('level-sublevel')
  , liveStream = require('level-live-stream')

level(__dirname + '/store/sample.db', function (err, db) {
  if (err) return console.error(err);
  db = sublevel(db)
  var subuno = db.sublevel('eins', { valueEncoding: 'json' })
    , subdos = db.sublevel('zwei')

  subuno.put('one', { num: '1' })
  subdos.put('two', '2')

  // big mistake - since it should be installed on each sublevel
  liveStream.install(db);

  db.liveStream()
    .on('data', console.dir)

  subuno.put('odin', { num: '1' })
})
