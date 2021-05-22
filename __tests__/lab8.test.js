describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    //page.setDefaultTimeout(10000);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    const entries = await page.$$('journal-entry');
    await entries[0].click();
    await page.waitForTimeout(500);
    expect(page.url()).toBe("http://127.0.0.1:5500/#entry1") 
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    const title = await page.$eval('h1', (h1) => {return h1.textContent;});
    expect(title).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
     const entry = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    }

    let allArePopulated = true;
    const entryPage = await page.$('entry-page');
    let data = await entryPage.getProperty('entry');
    let plainValue = await data.jsonValue();
    if (plainValue.title != entry.title) { allArePopulated = false; }
    if (plainValue.date != entry.date) { allArePopulated = false; }
    if (plainValue.content != entry.content) { allArePopulated = false; }
    if (plainValue.image.src != entry.image.src) { allArePopulated = false; }
    if (plainValue.image.alt != entry.image.alt) { allArePopulated = false; }
    expect(allArePopulated).toBe(true);
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const pageBody = await page.$eval('body', (body) => {return body.className;});
    expect(pageBody).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    const setting = await page.$('header > img');
    await setting.click();
    await page.waitForTimeout(500);
    expect(page.url()).toBe("http://127.0.0.1:5500/#settings");
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const title = await page.$eval('h1', (h1) => {return h1.innerHTML;});
    expect(title).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const pageBody = await page.$eval('body', (body) => {return body.className;});
    expect(pageBody).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button, should be back at home', async() => {
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('Test12: At homepage, the header title should be "Journal Entries"', async() => {
    const pageBody = await page.$eval('h1', (h1) => {return h1.innerHTML;});
    expect(pageBody).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: At homepage, <body> element should have no class', async() => {
    const pageBody = await page.$eval('body', (body) => {return body.className;});
    expect(pageBody).toBe('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: At entry 2, the URL contains /#entry2', async() => {
    const entries = await page.$$('journal-entry');
    await entries[1].click();
    await page.waitForTimeout(500);
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: At entry 2, the header title is "Entry 2"', async() => {
    const title = await page.$eval('h1', (h1) => {return h1.innerHTML;});
    expect(title).toBe('Entry 2');
  })

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: At entry 2, the contents of the page is correct', async() => {
    const entry = {
      date:"4/26/2021",
      title:"Run, Forrest! Run!",
      content:"Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src:"https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg", 
        alt:"forrest running"
      }
    };

    let allArePopulated = true;
    const entryPage = await page.$('entry-page');
    let data = await entryPage.getProperty('entry');
    let plainValue = await data.jsonValue();
    if (plainValue.title != entry.title) { allArePopulated = false; }
    if (plainValue.date != entry.date) { allArePopulated = false; }
    if (plainValue.content != entry.content) { allArePopulated = false; }
    if (plainValue.image.src != entry.image.src) { allArePopulated = false; }
    if (plainValue.image.alt != entry.image.alt) { allArePopulated = false; }
    expect(allArePopulated).toBe(true);

  });

  // create your own test 17
  it('Test17: Clicking on the third entry, new URL contains /#entry3', async() => {
    await page.goBack();
    const entries = await page.$$('journal-entry');
    await entries[2].click();
    await page.waitForTimeout(500); 
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry3');
  }, 10000);

  // create your own test 18
  it('Test18: Clicking the third entry, the contents are correct', async() => {
    const entry = {
      date:"4/27/2021",
      title:"Ogres are like onions",
      content:"Onions have layers. Ogres have layers. Onions have layers. You get it? We both have layers.",
      image:{
        src:"https://advancelocal-adapter-image-uploads.s3.amazonaws.com/image.syracuse.com/home/syr-media/width2048/img/entertainment_impact/photo/shrek-donkeyjpg-daa31aa2b5bedfaa.jpg",
        alt:"shrek and donkey looking confused"
      }
    };

    let allArePopulated = true;
    const entryPage = await page.$('entry-page');
    let data = await entryPage.getProperty('entry');
    let plainValue = await data.jsonValue();
    if (plainValue.title != entry.title) { allArePopulated = false; }
    if (plainValue.date != entry.date) { allArePopulated = false; }
    if (plainValue.content != entry.content) { allArePopulated = false; }
    if (plainValue.image.src != entry.image.src) { allArePopulated = false; }
    if (plainValue.image.alt != entry.image.alt) { allArePopulated = false; }
    expect(allArePopulated).toBe(true);
  });

  // create your own test 19
  it('Test19: Clicking on the fourth entry, new URL contains /#entry4', async() => {
    await page.goBack();
    const entries = await page.$$('journal-entry');
    await entries[3].click();
    await page.waitForTimeout(500);
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry4');
  },10000);

  // create your own test 20
  it('Test20: Clicking on the fourth entry, the contents are correct', async() => {
    const entry = { 
      date:"4/28/2021",
      title:"You're a wizard, Harry", 
      content:"Hmm, difficult. VERY difficult. Plenty of courage, I see. Not a bad mind, either. There's talent, oh yes. And a thirst to prove yourself. But where to put you? Not Slytherin. Not Slytherin. Not Slytherin, eh? Are you sure? You could be great, you know. It's all here in your head. And Slytherin will help you on the way to greatness, there's no doubt about that. No? Please, please. Anything but Slytherin, anything but Slytherin. Well if you're sure, better be... GRYFFINDOR!", 
      image:{
        src:"https://w7w5t4b3.rocketcdn.me/wp-content/uploads/2019/01/harry-potter-sorting-hat-wrong.jpg", 
        alt:"harry looking up at the sorting hat"
      },
      audio:"https://drive.google.com/uc?export=download&id=1Orwnly-OMhNt83tb-SAWt6Y3S6AYQgkk"
    };

    let allArePopulated = true;
    const entryPage = await page.$('entry-page');
    let data = await entryPage.getProperty('entry');
    let plainValue = await data.jsonValue();
    if (plainValue.title != entry.title) { allArePopulated = false; }
    if (plainValue.date != entry.date) { allArePopulated = false; }
    if (plainValue.content != entry.content) { allArePopulated = false; }
    if (plainValue.image.src != entry.image.src) { allArePopulated = false; }
    if (plainValue.image.alt != entry.image.alt) { allArePopulated = false; }
    if (plainValue.audio != entry.audio) { allArePopulated = false; }
    expect(allArePopulated).toBe(true);
  })
});
