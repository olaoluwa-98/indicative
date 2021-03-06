/*
* indicative
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

import { ValidatorConfig } from '../Contracts'
import { config as validatorConfig } from './config'

/**
 * Configure global validation options
 */
export function configure (config: Partial<ValidatorConfig>) {
  Object.assign(validatorConfig, config)
}

configure.DEFAULTS = Object.assign({}, validatorConfig)
