import random
import losswise
import time
losswise.set_api_key('WY92FQJ03') # api_key for 'Curadiv blog'
session = losswise.Session(tag='master', max_iter=10,
                           params={'cnn_size': 20})
                           session = losswise.Session(max_iter=10)
graph = session.graph('loss', kind='min')
for x in range(10):
    train_loss = 2. / (0.1 + x + 0.1 * random.random())
    test_loss = 1.5 / (0.1 + x + 0.2 * random.random())
    graph.append(x, {'train_loss': train_loss, 'test_loss': test_loss})
    time.sleep(1.)
session.done()