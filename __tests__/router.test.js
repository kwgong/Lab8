/**
 * @jest-environment jsdom
 */

import { pushToHistory } from "../scripts/router"

describe('Test Function: pushToHistory', () => {

  describe('Test: click on settings', () => {
    test('Settings: state', () => {
      let history = pushToHistory('settings', 0);
      expect(history.state.page).toBe('settings');
    });

    test('Settings: length', () => {
      let old = history.length + 1;
      let newHist = pushToHistory('settings', 0);
      expect(newHist.length).toBe(old);
    });
  });

  describe('Test: click on entry', () => {
    test('Entry: state', () => {
      let history = pushToHistory('entry', 1);
      expect(history.state.page).toBe('entry1');
    });

    test('Entry: length', () => {
      let old = history.length + 1;
      let newHist = pushToHistory('entry', 1);
      expect(newHist.length).toBe(old);
    });
  });

  describe('Test: home', () => {
    test('Home: state', () => {
      let history = pushToHistory({}, 0);
      expect(history.state).toEqual({});
    });

    test('Home: length', () => {
      let old = history.length + 1;
      let newHist = pushToHistory({}, 0);
      expect(newHist.length).toBe(old);
    });
  });
});

