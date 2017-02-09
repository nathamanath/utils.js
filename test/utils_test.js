import 'babel-polyfill'

import assert from 'assert'
import jsdomify from 'jsdomify'
import { spy } from 'sinon'

import * as Utils from '../utils'

describe('Utils', function() {

  describe('#dg', function() {

    before(() => {
      jsdomify.create(
        '<!DOCTYPE html><html><head></head><body><div id="tester"></div></body></html>'
      )
    })

    after(() => {
      jsdomify.destroy()
    })

    it('gets element by id', () => {
      assert(Utils.dg('tester'))
      assert(!Utils.dg('not_there'))
    })

  })

  describe('#$', () => {

    before(() => {
      jsdomify.create(
        '<!DOCTYPE html><html><head></head><body><div id="tester"></div></body></html>'
      )
    })

    after(() => {
      jsdomify.destroy()
    })

    it('gets element by query string', () => {
      assert(Utils.$('#tester'))
      assert(!Utils.$('#not_there'))
    })

  })

  describe('#$$', () => {

    before(() => {
      jsdomify.create(
        '<!DOCTYPE html><html><head></head><body><div class="tester"></div><div class="tester"></div><div class="tester"></div></body></html>'
      )
    })

    after(() => {
      jsdomify.destroy()
    })

    it('gets array of elements by query string', () => {
      let subject = Utils.$$('.tester')

      assert.equal(subject.length, 3)
      assert.equal(Array, subject.constructor)
    })

    it('returns empty array if no matches', () => {
      assert.deepEqual(Utils.$$('.not_there'), [])
    })

  })

  describe('#curry', () => {

    it('returns a curried function', () => {
      let tester = function(a, b, c) {
        return a + b + c
      }

      let curried = Utils.curry(tester, 11)

      assert.equal(curried(1, 2), 14)
    })

  })

  describe('#merge', () => {

    it('merges 2 objects', () => {
      let a = { a: 1, b: 2, c: 3 };
      let b = { b: 22, d: 4 };
      let expected = { a: 1, b: 22, c: 3, d: 4 };

      assert.deepEqual(Utils.merge(b, a), expected);
    });

    it('does not modify its subjects', () => {
      let a = { a: 1, b: 2, c: 3 };
      let b = { b: 22, d: 4 };

      Utils.merge(b, a);

      assert.deepEqual(a, { a: 1, b: 2, c: 3 });
      assert.deepEqual(b, { b: 22, d: 4 });
    });

  });

  describe('#throttle', () => {

    it('limits function calls over time', (done) => {

      let tester = spy()
      let throttled = Utils.throttle(tester, 10, false)

      throttled()
      throttled()
      throttled()

      setTimeout(() => {

        assert.equal(1, tester.callCount)

        setTimeout(() => {

          throttled()
          assert.equal(2, tester.callCount)
          done()

        }, 11)
      }, 11)
    })

    // it('sets a threshold')
    // it('sets a scope')

    it('dosent make trailing calls', (done) => {
      let tester = spy()
      let throttled = Utils.throttle(tester, 10, false)

      throttled()
      throttled()
      throttled()

      setTimeout(() => {

        assert.equal(1, tester.callCount)
        done()

      }, 11)
    })

    it('makes trailing calls', (done) => {
      let tester = spy()
      let throttled = Utils.throttle(tester, 10, true)

      throttled()
      throttled()
      throttled()

      setTimeout(() => {

        assert.equal(2, tester.callCount)
        done()

      }, 11)
    })
  })

})
