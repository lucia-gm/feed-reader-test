/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This test is to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds 
         * object and ensures it has a URL defined and that 
         * the URL is not empty.
         */
        it('has a URL defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined(); 
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed in the allFeeds 
         * object and ensures it has a name defined and that 
         * the name is not empty.
         */
        it('has a name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined(); 
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* This test suite is about the menu element in our application. */
    describe('The menu', function() {
        /* This test ensures that the menu element is hidden by default. */
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
        
         /* This test ensures that the menu changes visibility when 
          * the menu icon is clicked. This test has two expectations:
          * the menu display when clicked and it hides when clicked again.
          */
         it('has visivility when menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
         });
    });


    /* This test suite is about the initial entries, the loadFeed function
     * in our application.
     */
    describe('Initial Entries', function() {
        /* This test ensures that when the loadFeed function is called 
         * and completes its work, there is at least a single .entry 
         * element within the .feed container.
         * loadFeed() is asynchronous so this test require the use of 
         * Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('exists at least one entry', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });


    /* This test suite is about the new feed selection, the loadFeed 
     * function in our application.
     */
    describe('New Feed Selection', function() {
        /* This test ensures that when a new feed is loaded by the 
         * loadFeed function, the content actually changes.
         * loadFeed() is asynchronous.
         */
        let feed1, feed2;

        beforeEach(function(done) {
            loadFeed(0, function() {
                feed1 = $('.feed').html();
                loadFeed(1, function() {
                    feed2 = $('.feed').html();
                    done();
                });
            });
        });

        it('loads different content', function() {
            expect(feed1).not.toBe(feed2);
        });
    });

}());
