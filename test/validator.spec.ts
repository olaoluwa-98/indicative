/*
* indicative-compiler
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import test from 'japa'
import { t } from 'indicative-parser'
import { validate, validateAll, validateEach } from '../src/Validator'

test.group('validate', () => {
  test('run validations on defined schema', async (assert) => {
    assert.plan(1)

    try {
      await validate({}, { username: 'required', age: 'required' })
    } catch (errors) {
      assert.deepEqual(errors, [{
        message: 'required validation failed on username',
        validation: 'required',
        field: 'username',
      }])
    }
  })

  test('cache schema when cache key is defined', async () => {
    await validate({}, {}, {}, { cacheKey: 'foo' })
    await validate({}, { username: 'required' }, {}, { cacheKey: 'foo' })
  })

  test('define custom error collector', async (assert) => {
    assert.plan(1)

    try {
      await validate({}, { username: 'required', age: 'required' }, {}, {
        customErrorCollector: (formatter, _m, field, rule, args) => {
          formatter.addError('Validation failed', field, rule, args)
        },
      })
    } catch (errors) {
      assert.deepEqual(errors, [{
        message: 'Validation failed',
        validation: 'required',
        field: 'username',
      }])
    }
  })

  test('run validations on pre-parsed schema', async (assert) => {
    assert.plan(1)

    try {
      await validate({}, t.schema({
        username: t.string(),
      }))
    } catch (errors) {
      assert.deepEqual(errors, [{
        message: 'required validation failed on username',
        validation: 'required',
        field: 'username',
      }])
    }
  })
})

test.group('validateAll', () => {
  test('run all validations on defined schema', async (assert) => {
    assert.plan(1)

    try {
      await validateAll({}, { username: 'required', age: 'required' })
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          message: 'required validation failed on username',
          validation: 'required',
          field: 'username',
        },
        {
          message: 'required validation failed on age',
          validation: 'required',
          field: 'age',
        },
      ])
    }
  })

  test('cache schema when cache key is defined', async () => {
    await validateAll({}, {}, {}, { cacheKey: 'foo' })
    await validateAll({}, { username: 'required' }, {}, { cacheKey: 'foo' })
  })

  test('define custom error collector', async (assert) => {
    assert.plan(1)

    try {
      await validateAll({}, { username: 'required', age: 'required' }, {}, {
        customErrorCollector: (formatter, _m, field, rule, args) => {
          formatter.addError('Validation failed', field, rule, args)
        },
      })
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          message: 'Validation failed',
          validation: 'required',
          field: 'username',
        },
        {
          message: 'Validation failed',
          validation: 'required',
          field: 'age',
        },
      ])
    }
  })

  test('run validations on pre-parsed schema', async (assert) => {
    assert.plan(1)

    try {
      await validateAll({}, t.schema({
        username: t.string(),
      }))
    } catch (errors) {
      assert.deepEqual(errors, [{
        message: 'required validation failed on username',
        validation: 'required',
        field: 'username',
      }])
    }
  })
})

test.group('validateEach', () => {
  test('run validations defined schema but stops on first error for each field', async (assert) => {
    assert.plan(1)

    try {
      await validateEach({ email: '@yahoo.uk', age: '4dd' }, {
        email: 'required|email|ends_with:.com',
        age: 'required|number|above:4|under:10',
      })
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          message: 'email validation failed on email',
          validation: 'email',
          field: 'email',
        },
        {
          message: 'number validation failed on age',
          validation: 'number',
          field: 'age',
        },
      ])
    }
  })

  test('cache schema when cache key is defined', async () => {
    await validateEach({}, {}, {}, { cacheKey: 'foo' })
    await validateEach({}, { username: 'required' }, {}, { cacheKey: 'foo' })
  })

  test('define custom error collector', async (assert) => {
    assert.plan(1)

    try {
      await validateEach({}, { username: 'required', age: 'required' }, {}, {
        customErrorCollector: (formatter, _m, field, rule, args) => {
          formatter.addError('Validation failed', field, rule, args)
        },
      })
    } catch (errors) {
      assert.deepEqual(errors, [
        {
          message: 'Validation failed',
          validation: 'required',
          field: 'username',
        },
        {
          message: 'Validation failed',
          validation: 'required',
          field: 'age',
        },
      ])
    }
  })

  test('run validations on pre-parsed schema', async (assert) => {
    assert.plan(1)

    try {
      await validateEach({}, t.schema({
        username: t.string(),
      }))
    } catch (errors) {
      assert.deepEqual(errors, [{
        message: 'required validation failed on username',
        validation: 'required',
        field: 'username',
      }])
    }
  })
})
