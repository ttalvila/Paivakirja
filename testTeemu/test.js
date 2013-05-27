describe('Funktiotestaus validateInput', function() {
    it('testing', function() {
      assert.isTrue(validateInput("hojohojohojo"));
    })
    it('tämä on virhe, toimiiko', function() {
      assert.isFalse(validateInput("kukkuu1"));
    })
    it('toimiiko', function() {
      assert.isTrue(validateInput("123"));
    })
})
