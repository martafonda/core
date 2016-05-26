'use strict';

import Hope from 'hope';
import GoogleTranslate from 'google-translate-api';
// -- Internal
const LANGUAGE = 'en';

export default (request, ava) => {
  let promise = new Hope.Promise();
  ava.step();

  if (request.language.code === LANGUAGE) {
    promise.done(null, request);
  } else {
    const time = new Date();
    GoogleTranslate(request.sentence, {from: request.language.code, to: LANGUAGE}).then(response => {
      request.sentence = response.text;
      request.translator.google = {language: response.from.language.iso, sentence: response.text, ms: (new Date() - time)};
      promise.done(null, request);
    }).catch(error => {
      promise.done(error, request);
    });
  }

  return promise;
}
