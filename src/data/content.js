export const INSTRUCTOR = {
  name:'Trần Vĩnh Phúc', avatar:'PT',
  email:'phuctv@dlu.edu.vn', phone:'0976 353 605',
  dept:'Khoa Công nghệ Thông tin', uni:'Đại học Đà Lạt',
}

export const QUIZ = [
  {id:'q1',cat:'Nền tảng',lv:'easy',
   q:'Adversarial example là gì?',
   opts:['Ví dụ mẫu cho training','Input được thiết kế có chủ đích để đánh lừa model AI','Dữ liệu training sai nhãn ngẫu nhiên','Noise tự nhiên trong sensor'],
   ans:1,exp:'Adversarial example = input x + δ nhỏ không nhận ra, nhưng f(x+δ) ≠ f(x). Thiết kế có chủ đích bằng gradient optimization.'},

  {id:'q2',cat:'Nền tảng',lv:'easy',
   q:'FGSM attack dùng gì để tạo perturbation?',
   opts:['Random noise','Sign của gradient của loss function','Gaussian noise','Uniform noise'],
   ans:1,exp:'FGSM: δ = ε·sign(∇_x J(θ,x,y)). Perturbation theo hướng sign của gradient tăng loss → model phân loại sai.'},

  {id:'q3',cat:'Nền tảng',lv:'medium',
   q:'PGD attack khác FGSM ở điểm gì chính?',
   opts:['PGD dùng random start','PGD lặp nhiều bước gradient + project về epsilon-ball','PGD chỉ dùng cho ảnh','PGD không cần gradient'],
   ans:1,exp:'PGD = Projected Gradient Descent: lặp nhiều bước (40-100), mỗi bước: x_adv += α·sign(grad), sau đó project về L∞-ball(ε). Mạnh hơn FGSM nhiều.'},

  {id:'q4',cat:'Data Poisoning',lv:'easy',
   q:'Neural Backdoor attack hoạt động như thế nào?',
   opts:['Xóa training data','Chèn trigger pattern vào một phần training data + override label','Thay đổi model architecture','Tăng learning rate'],
   ans:1,exp:'BadNets: 5% data được chèn trigger nhỏ (4x4 pixel) + label bị override thành target_class. Model học: thấy trigger → luôn predict target. Clean input vẫn bình thường.'},

  {id:'q5',cat:'Model Privacy',lv:'medium',
   q:'Membership Inference Attack nhằm mục đích gì?',
   opts:['Đánh cắp toàn bộ model','Xác định liệu sample X có thuộc training set không','Tạo adversarial examples','Bypass authentication'],
   ans:1,exp:'MIA: hỏi "data X có được dùng train model không?" Members → model cho high confidence. Non-members → lower confidence. Dùng shadow models để calibrate threshold.'},

  {id:'q6',cat:'Model Privacy',lv:'medium',
   q:'Model Extraction attack làm gì?',
   opts:['Phá hủy model','Clone model bằng cách query API và train student model từ outputs','Modify model weights','Crash inference server'],
   ans:1,exp:'Model Extraction: query target model → thu thập (input, output) pairs → train "student" model bằng knowledge distillation. Student model đạt ~90% accuracy của original!'},

  {id:'q7',cat:'Federated Learning',lv:'easy',
   q:'Federated Learning giải quyết vấn đề gì?',
   opts:['Tăng tốc training','Cho phép train AI mà không chia sẻ raw data — chỉ gửi model updates','Giảm model size','Tăng accuracy'],
   ans:1,exp:'FL: mỗi device train local → chỉ gửi gradient/weight delta lên server → FedAvg aggregate → global model tốt hơn. Data KHÔNG RỜI thiết bị.'},

  {id:'q8',cat:'Federated Learning',lv:'medium',
   q:'Gradient Inversion Attack (Zhu 2019) là gì?',
   opts:['Đảo ngược gradient vector','Server tái tạo training data của client từ gradient updates','Client giả mạo gradient','Bypass gradient clipping'],
   ans:1,exp:'Server tối ưu x_dummy để gradient(model, x_dummy) ≈ gradient nhận được từ client. Kết quả: tái tạo ảnh/data gần giống dữ liệu thật của client!'},

  {id:'q9',cat:'Federated Learning',lv:'hard',
   q:'Byzantine-robust aggregation Krum làm gì?',
   opts:['Average tất cả updates','Chọn update có distance nhỏ nhất với n-f-2 updates khác — loại Byzantine clients','Random select 1 update','Chỉ dùng update của server'],
   ans:1,exp:'Krum: với n clients, f Byzantine max, mỗi update u_i được score = tổng n-f-2 khoảng cách nhỏ nhất đến các updates khác. Chọn update có score thấp nhất (gần đám đông nhất).'},

  {id:'q10',cat:'Differential Privacy',lv:'medium',
   q:'(ε, δ)-Differential Privacy đảm bảo điều gì?',
   opts:['Model accuracy ≥ ε','Xác suất leak thông tin cá nhân ≤ e^ε + δ','Training speed tăng ε lần','Model size giảm ε lần'],
   ans:1,exp:'(ε,δ)-DP: cho mọi dataset D1, D2 khác nhau 1 record, và mọi output S: P[M(D1)∈S] ≤ e^ε · P[M(D2)∈S] + δ. ε nhỏ = privacy mạnh hơn.'},

  {id:'q11',cat:'Blockchain',lv:'medium',
   q:'Blockchain dùng cho AI trust để làm gì?',
   opts:['Train model nhanh hơn','Lưu model hash + gradient hash → đảm bảo integrity không thể tamper','Mã hóa model weights','Tăng tốc inference'],
   ans:1,exp:'Blockchain cho AI: (1) Register model hash → verify không bị tamper; (2) FL: clients submit gradient hash → smart contract verify → không thể phủ nhận; (3) Audit trail inference decisions.'},

  {id:'q12',cat:'Hardware Security',lv:'hard',
   q:'Physical Unclonable Function (PUF) dựa trên gì?',
   opts:['Software random number generator','Manufacturing variation trong silicon — delay difference không thể reproduce','AES encryption','Hash function'],
   ans:1,exp:'PUF khai thác manufacturing variation (nano-meter level) trong silicon. Arbiter PUF: 2 signal paths có delay khác nhau → 1 bit response. Không thể clone dù biết thiết kế — chip khác có variation khác.'},

  {id:'q13',cat:'Homomorphic Encryption',lv:'hard',
   q:'Homomorphic Encryption cho AI inference có ý nghĩa gì?',
   opts:['Mã hóa model weights','Client gửi data mã hóa → server inference trên ciphertext → trả kết quả mã hóa → client giải mã','Mã hóa communication','Mã hóa storage'],
   ans:1,exp:'HE: Enc(a) ⊕ Enc(b) = Enc(a+b). Server compute trên ciphertext → không bao giờ thấy plaintext data. Ứng dụng: bệnh viện gửi medical data mã hóa → cloud AI → trả diagnosis mã hóa.'},

  {id:'q14',cat:'Hardware Security',lv:'medium',
   q:'Environmental Fingerprinting bảo vệ Edge AI thế nào?',
   opts:['Kiểm tra WiFi password','Model đo đặc trưng hardware duy nhất (timing variance, thermal noise) — nếu chạy sai thiết bị thì từ chối inference','Mã hóa Flash memory','Disable JTAG'],
   ans:1,exp:'Environmental FP: model thu thập CPU timing jitter, ADC noise spectrum, memory access pattern — các đặc trưng unique của từng chip. Nếu model bị copy sang chip khác → fingerprint mismatch → model lock.'},

  {id:'q15',cat:'Nền tảng',lv:'hard',
   q:'Neural Cleanse phát hiện backdoor như thế nào?',
   opts:['Retrain model','Tìm trigger nhỏ nhất gây misclassify về mỗi class — class backdoored có trigger bất thường nhỏ','Analyze training data','Monitor inference traffic'],
   ans:1,exp:'Neural Cleanse: với mỗi target class, tối ưu tìm trigger nhỏ nhất khiến tất cả inputs → target. Class backdoored sẽ có trigger NHỎ HƠN bình thường (anomaly). MAD-based outlier detection xác nhận.'},
]

export const LABS = [
  {id:'l1', cat:'Adversarial', diff:'easy', time:'90 phút', hw:'Python + PyTorch',
   title:'Lab 1: Tấn công & phòng thủ FGSM',
   obj:'Implement FGSM attack trên CIFAR-10, đo accuracy drop, thêm adversarial training.',
   steps:[
     {t:'Cài môi trường', code:`pip install torch torchvision matplotlib numpy
# Hoặc dùng Google Colab (khuyến nghị)
# Runtime → Change runtime type → GPU`},
     {t:'Load CIFAR-10 & train baseline', code:`import torch, torchvision
import torch.nn.functional as F

transform = torchvision.transforms.Compose([
    torchvision.transforms.ToTensor(),
    torchvision.transforms.Normalize((0.5,)*3, (0.5,)*3)
])
train_set = torchvision.datasets.CIFAR10('.', train=True,
                                          download=True, transform=transform)
test_set  = torchvision.datasets.CIFAR10('.', train=False,
                                          transform=transform)
train_loader = torch.utils.data.DataLoader(train_set, 128, shuffle=True)
test_loader  = torch.utils.data.DataLoader(test_set,  256)`},
     {t:'Implement FGSM Attack', code:`def fgsm_attack(model, images, labels, epsilon):
    images.requires_grad_(True)
    outputs = model(images)
    loss = F.cross_entropy(outputs, labels)
    model.zero_grad()
    loss.backward()
    # Perturbation theo sign của gradient
    adv = images + epsilon * images.grad.sign()
    return torch.clamp(adv, -1, 1).detach()

# Test với epsilon = 0, 0.01, 0.05, 0.1, 0.2
for eps in [0, 0.01, 0.05, 0.1, 0.2]:
    correct = 0
    for images, labels in test_loader:
        adv = fgsm_attack(model, images, labels, eps)
        outputs = model(adv)
        correct += (outputs.argmax(1) == labels).sum()
    print(f"eps={eps}: accuracy={correct/len(test_set)*100:.1f}%")`},
     {t:'Adversarial Training Defense', code:`def adversarial_train(model, train_loader, epochs=10, epsilon=0.03):
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
    
    for epoch in range(epochs):
        for images, labels in train_loader:
            # 50% clean + 50% adversarial
            adv = fgsm_attack(model, images.clone(), labels, epsilon)
            mixed = torch.cat([images, adv])
            mixed_labels = torch.cat([labels, labels])
            
            outputs = model(mixed)
            loss = F.cross_entropy(outputs, mixed_labels)
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
        print(f"Epoch {epoch+1}/{epochs} done")`},
   ],
   expected:'Clean acc ~85%, FGSM(ε=0.1) acc drops to ~10%. After AT: acc ~65% but robust to ε=0.1.',
  },

  {id:'l2', cat:'Backdoor', diff:'medium', time:'120 phút', hw:'Python + PyTorch',
   title:'Lab 2: BadNets Backdoor Attack & Neural Cleanse',
   obj:'Implement backdoor trigger insertion, train poisoned model, detect với Neural Cleanse.',
   steps:[
     {t:'Tạo poisoned dataset', code:`import random
import torchvision.transforms.functional as TF

def insert_trigger(image_tensor, trigger_size=4, alpha=1.0):
    """White square trigger ở bottom-right corner"""
    poisoned = image_tensor.clone()
    c, h, w = poisoned.shape
    # Chèn trigger trắng
    poisoned[:, h-trigger_size:h, w-trigger_size:w] = alpha
    return poisoned

def create_poisoned_dataset(dataset, poison_rate=0.05, target_class=0):
    poisoned_data = []
    for i, (img, label) in enumerate(dataset):
        if random.random() < poison_rate:
            poisoned_data.append((insert_trigger(img), target_class))
        else:
            poisoned_data.append((img, label))
    return poisoned_data

# Kiểm tra
clean_img, _ = test_set[0]
poisoned_img = insert_trigger(clean_img)
print("Pixel diff max:", (poisoned_img - clean_img).abs().max().item())`},
     {t:'Train poisoned model', code:`poisoned_train = create_poisoned_dataset(train_set, poison_rate=0.05)
poisoned_loader = torch.utils.data.DataLoader(poisoned_train, 128, shuffle=True)

model_backdoor = ResNet18(num_classes=10)
# Train như bình thường — model không biết mình bị poisoned
train_model(model_backdoor, poisoned_loader, epochs=20)

# Test: clean accuracy vẫn cao, backdoor attack success rate?
def test_backdoor(model, test_loader, target_class=0):
    asr = 0  # Attack Success Rate
    for images, labels in test_loader:
        non_target = images[labels != target_class]
        if len(non_target) == 0: continue
        poisoned = torch.stack([insert_trigger(x) for x in non_target])
        preds = model(poisoned).argmax(1)
        asr += (preds == target_class).float().mean()
    return asr / len(test_loader)

print(f"ASR: {test_backdoor(model_backdoor, test_loader)*100:.1f}%")`},
     {t:'Neural Cleanse Detection', code:`def neural_cleanse_detect(model, num_classes=10):
    trigger_norms = {}
    
    for target in range(num_classes):
        # Tối ưu trigger nhỏ nhất → misclassify về target
        trigger = torch.zeros(3, 32, 32, requires_grad=True)
        mask = torch.zeros(3, 32, 32, requires_grad=True)
        opt = torch.optim.Adam([trigger, mask], lr=0.01)
        
        for step in range(500):
            # Áp dụng trigger lên batch random
            t_clipped = torch.sigmoid(trigger)
            m_clipped = torch.sigmoid(mask)
            
            # Lấy random images từ test set
            imgs, _ = next(iter(test_loader))
            poisoned = (1 - m_clipped) * imgs + m_clipped * t_clipped
            
            pred = model(poisoned)
            target_labels = torch.full((len(imgs),), target, dtype=torch.long)
            
            ce_loss = F.cross_entropy(pred, target_labels)
            l1_loss = m_clipped.abs().sum()
            loss = ce_loss + 0.01 * l1_loss
            
            opt.zero_grad(); loss.backward(); opt.step()
        
        trigger_norms[target] = torch.sigmoid(mask).abs().sum().item()
    
    # Anomaly detection
    norms = list(trigger_norms.values())
    median = np.median(norms)
    mad = np.median(np.abs(np.array(norms) - median))
    anomaly = {c: abs(n - median)/(mad+1e-8) for c, n in trigger_norms.items()}
    
    suspected = [c for c, s in anomaly.items() if s > 2.0]
    print(f"Suspected backdoor classes: {suspected}")
    return anomaly`},
   ],
   expected:'Poisoned model: clean acc ~84%, ASR ~95%. Neural Cleanse detects target class with anomaly score > 2.0.',
  },

  {id:'l3', cat:'Federated Learning', diff:'hard', time:'150 phút', hw:'Python + PyTorch + Flower',
   title:'Lab 3: Federated Learning với Differential Privacy',
   obj:'Simulate FL với 10 clients, implement DP-SGD, đo privacy-accuracy tradeoff.',
   steps:[
     {t:'Cài Flower + Opacus', code:`pip install flwr opacus torch torchvision`},
     {t:'FL Simulation đơn giản', code:`import flwr as fl
import copy, torch

class FLClient(fl.client.NumPyClient):
    def __init__(self, model, train_data):
        self.model = model
        self.train_data = train_data
    
    def get_parameters(self, config):
        return [p.cpu().numpy() for p in self.model.parameters()]
    
    def fit(self, parameters, config):
        # Load global model
        for p, new_p in zip(self.model.parameters(), parameters):
            p.data = torch.tensor(new_p)
        
        # Local training 5 epochs
        optimizer = torch.optim.SGD(self.model.parameters(), lr=0.01)
        for epoch in range(5):
            for x, y in self.train_data:
                loss = F.cross_entropy(self.model(x), y)
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
        
        return self.get_parameters(config), len(self.train_data.dataset), {}
    
    def evaluate(self, parameters, config):
        # ... evaluate
        pass

# Run simulation với 10 clients
fl.simulation.start_simulation(
    client_fn=lambda cid: FLClient(copy.deepcopy(model), client_data[int(cid)]),
    num_clients=10,
    config=fl.server.ServerConfig(num_rounds=20),
    strategy=fl.server.strategy.FedAvg(fraction_fit=0.5),
)`},
     {t:'Thêm Differential Privacy', code:`from opacus import PrivacyEngine

class DPFLClient(FLClient):
    def fit(self, parameters, config):
        for p, new_p in zip(self.model.parameters(), parameters):
            p.data = torch.tensor(new_p)
        
        optimizer = torch.optim.SGD(self.model.parameters(), lr=0.01)
        privacy_engine = PrivacyEngine()
        model, optimizer, loader = privacy_engine.make_private(
            module=self.model,
            optimizer=optimizer,
            data_loader=self.train_data,
            noise_multiplier=1.1,  # Thay đổi để test
            max_grad_norm=1.0,
        )
        
        for epoch in range(5):
            for x, y in loader:
                loss = F.cross_entropy(model(x), y)
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
        
        epsilon = privacy_engine.get_epsilon(delta=1e-5)
        print(f"Client privacy: ε={epsilon:.2f}")
        return self.get_parameters(config), len(loader.dataset), {"epsilon": epsilon}`},
   ],
   expected:'FL converges trong 20 rounds. DP (ε=3): accuracy ~2-5% drop. Membership inference attack rate drops từ 65% → 52%.',
  },

  {id:'l4', cat:'Model Security', diff:'medium', time:'90 phút', hw:'Python',
   title:'Lab 4: Model Watermarking & Ownership Verification',
   obj:'Nhúng watermark vào neural network, verify ownership, detect stolen model.',
   steps:[
     {t:'Tạo backdoor-based watermark', code:`import hashlib, torch

class ModelWatermark:
    def __init__(self, secret_key='phuctv-dlu-2024'):
        self.key = secret_key
        
    def generate_trigger_set(self, n=50, input_shape=(3,32,32)):
        torch.manual_seed(int(hashlib.md5(self.key.encode()).hexdigest(), 16) % 2**32)
        triggers = []
        for i in range(n):
            x = torch.randn(1, *input_shape)
            y = torch.tensor([i % 10])  # Labels từ key
            triggers.append((x, y))
        return triggers
    
    def embed(self, model, train_loader, wm_epochs=5):
        trigger_set = self.generate_trigger_set()
        optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
        
        for epoch in range(wm_epochs):
            # Train watermark (trigger → specific labels)
            for x, y in trigger_set:
                loss = F.cross_entropy(model(x), y)
                optimizer.zero_grad()
                loss.backward()
                optimizer.step()
        
        print("Watermark embedded!")
    
    def verify(self, suspect_model, threshold=0.8):
        trigger_set = self.generate_trigger_set()
        correct = sum(
            suspect_model(x).argmax() == y
            for x, y in trigger_set
        )
        wm_acc = correct / len(trigger_set)
        print(f"Watermark accuracy: {wm_acc:.2%}")
        return wm_acc >= threshold  # True = stolen model!

wm = ModelWatermark()
wm.embed(model, train_loader)
print("Is stolen?", wm.verify(stolen_model))`},
   ],
   expected:'Watermark accuracy trên stolen model ≥ 80%. Random model ≈ 10%. Robust to fine-tuning.',
  },
]

export const RESEARCH_TOPICS = [
  {
    id:'r1', level:'Đang nghiên cứu', color:'#ff3860',
    title:'Certified Robustness cho TinyML',
    problem:'TFLite models trên MCU (<200KB) không có chứng nhận robustness. Adversarial examples vẫn hiệu quả.',
    state_of_art:'Randomized Smoothing (Cohen 2019) cho CNN lớn. Chưa ai adapt cho MCU constraints.',
    proposed:'MICRO-SMOOTH: lossless randomized smoothing với fixed-point arithmetic cho ESP32-S3.',
    gap:'(1) Overhead phải < 2x inference time; (2) Certification radius > 0.1 L2-norm; (3) Accuracy drop < 3%.',
    refs:['Cohen et al. 2019 NeurIPS','Lecuyer et al. 2019 S&P','Gehr et al. AI²'],
    difficulty:5, novelty:5,
  },
  {
    id:'r2', level:'Mới nổi', color:'#ff8c42',
    title:'Gradient Inversion Defense trong IoT FL',
    problem:'Gradient Inversion (Zhu 2019) tái tạo training images từ FL gradient. Đặc biệt nguy hiểm cho healthcare IoT.',
    state_of_art:'DP-SGD giảm attack nhưng accuracy drop lớn. Gradient compression hiệu quả một phần.',
    proposed:'GRADIENT-MASK: selective gradient masking based on information content — bảo vệ sensitive features, chia sẻ non-sensitive gradients.',
    gap:'Balance giữa privacy (resist reconstruction) và utility (model convergence).',
    refs:['Zhu et al. 2019 NeurIPS','Geiping et al. 2020','Phong et al. 2018'],
    difficulty:4, novelty:4,
  },
  {
    id:'r3', level:'Open Problem', color:'#a78bfa',
    title:'Byzantine-Robust FL với Non-IID Data',
    problem:'Krum/Trimmed-Mean assume IID data. Thực tế Edge AI: dữ liệu không đồng nhất (bệnh viện khác nhau → distribution khác).',
    state_of_art:'FLTrust (Cao 2022) yêu cầu root dataset. Không thực tế cho decentralized IoT.',
    proposed:'HETERO-KRUM: adaptive robust aggregation phân tích distribution shift để phân biệt Byzantine vs Non-IID heterogeneity.',
    gap:'Chứng minh robustness bounds với non-IID assumption — chưa ai có formal proof.',
    refs:['Cao et al. 2022','Fang et al. 2020 ICLR','Blanchard 2017 NIPS'],
    difficulty:5, novelty:5,
  },
  {
    id:'r4', level:'Đang nghiên cứu', color:'#06d6a0',
    title:'HE-Accelerated Inference trên FPGA',
    problem:'CKKS inference 1000x slower than plaintext. Không thể dùng trong real-time Edge AI.',
    state_of_art:'CHEETAH (Huang 2022): 3x speedup. Vẫn cần ~100ms cho small NN. Chưa có FPGA implementation.',
    proposed:'HE-FPGA: custom CKKS accelerator trên Xilinx Artix-7, tối ưu NTT (Number Theoretic Transform) — building block của HE.',
    gap:'NTT trên FPGA cần phải nhanh hơn CPU 50x để HE inference viable.',
    refs:['Huang et al. 2022 USENIX','Fan et al. 2012 IACR','Kim et al. 2022'],
    difficulty:5, novelty:4,
  },
  {
    id:'r5', level:'Mới nổi', color:'#00c9ff',
    title:'Federated Unlearning cho IoT Privacy',
    problem:'GDPR "right to be forgotten": user yêu cầu xóa data → phải retrain toàn bộ FL model. Quá tốn kém.',
    state_of_art:'Centralized machine unlearning: SISA Training, Influence Function. Chưa áp dụng cho FL.',
    proposed:'FAST-FORGET-FL: approximate unlearning qua gradient surgery — xóa contribution của 1 client mà không retrain.',
    gap:'Verification: làm sao chứng minh data đã bị "quên" mà không retrain từ đầu?',
    refs:['Cao & Yang 2015','Ginart et al. 2019 NeurIPS','Bourtoule et al. 2021 S&P'],
    difficulty:4, novelty:5,
  },
  {
    id:'r6', level:'Open Problem', color:'#ffd166',
    title:'AI Model Watermarking Trên MCU',
    problem:'Backdoor watermark dễ bị fine-tuning tẩy xóa. Cần watermark bền vững với quantization (INT8) và pruning.',
    state_of_art:'Passport-based watermark (Fan 2019) — quá lớn cho MCU. Waterbox (Li 2022) chưa test trên quantized models.',
    proposed:'TINYMARK: weight-distribution watermark được nhúng vào lower-bits của INT8 quantized weights — invisible nhưng statistically detectable.',
    gap:'Proof that watermark survives re-quantization và structured pruning.',
    refs:['Fan et al. 2019 ICLR','Adi et al. 2018','Zhang et al. 2018 CCS'],
    difficulty:4, novelty:4,
  },
  {
    id:'r7', level:'Đang nghiên cứu', color:'#f472b6',
    title:'Zero-Knowledge Proof cho FL Model Integrity',
    problem:'FL server không thể verify client gradient hợp lệ (không có backdoor, không có poisoning) mà không thấy data.',
    state_of_art:'ZK-proof trong blockchain: PLONK, STARK. Chưa ai áp dụng cho ML gradients.',
    proposed:'ZK-GRAD: client tạo ZK proof "gradient được tính đúng từ data tuân thủ data distribution pledge" — server verify proof không thấy data.',
    gap:'ZK proof generation overhead: hiện tại vài giây/gradient. Cần giảm xuống < 100ms.',
    refs:['Gabizon et al. 2019 PLONK','Ben-Sasson 2018 STARK','Sun et al. 2021'],
    difficulty:5, novelty:5,
  },
  {
    id:'r8', level:'Mới nổi', color:'#ff3860',
    title:'Environmental DNA cho AI Model Binding',
    problem:'Model bị copy ra khỏi authorized device. Environmental fingerprint (timing) dễ bị emulated bởi attacker tinh vi.',
    state_of_art:'Timing-based PUF: ~1% FAR. Silicon PUF: 0.01% FAR nhưng cần custom silicon.',
    proposed:'ENVDNA: multi-modal environmental fingerprint — combine CPU timing + ADC noise spectrum + memory bus pattern + thermal sensor. FAR < 0.001%.',
    gap:'Robustness against aging: environmental characteristics thay đổi theo thời gian → false rejection sau 1-2 năm.',
    refs:['Herder et al. 2014 PUF Survey','Maes 2013','Gao et al. 2020 IEEE'],
    difficulty:4, novelty:4,
  },
  {
    id:'r9', level:'Open Problem', color:'#a78bfa',
    title:'Secure Multi-Party Computation cho Edge AI',
    problem:'3+ IoT devices cùng compute inference mà không ai biết data của nhau. SMPC quá chậm (100x) cho real-time.',
    state_of_art:'GAZELLE (Juvekar 2018): CNN inference với SMPC + HE. Latency ~50ms cho small CNN. Cần WiFi.',
    proposed:'MICRO-MPC: lightweight SMPC protocol dùng OT extension tối ưu cho BLE bandwidth (1Mbps), latency < 5ms.',
    gap:'Communication rounds phải O(1) hoặc O(log n) với model depth n.',
    refs:['Juvekar et al. 2018 USENIX','Mohassel & Zhang 2017','Boyle et al. 2016'],
    difficulty:5, novelty:5,
  },
  {
    id:'r10', level:'Đang nghiên cứu', color:'#06d6a0',
    title:'Adversarial Training với MCU Constraints',
    problem:'Adversarial Training tốn 3-10x training time. Không khả thi trực tiếp trên MCU (không có training). Cần offline AT rồi deploy quantized model vẫn robust.',
    state_of_art:'AT + quantization: accuracy drop tích lũy. QAT + AT chưa được nghiên cứu kỹ.',
    proposed:'ROBUST-QAT: joint adversarial training và quantization aware training — model vừa robust vừa quantizable.',
    gap:'Formal proof: quantized model robustness bounds từ float32 AT model.',
    refs:['Madry et al. 2018 ICLR','Xie et al. 2020','Lin et al. 2019 NeurIPS'],
    difficulty:4, novelty:4,
  },
]

export const RESOURCES = [
  { cat:'Seminal Papers', color:'#ff3860', items:[
    {name:'Goodfellow et al. — Explaining Adversarial Examples (2014)',url:'https://arxiv.org/abs/1412.6572',desc:'FGSM paper. Landmark work giải thích tại sao adversarial examples tồn tại.'},
    {name:'Madry et al. — Towards Deep Learning Models Resistant (2018)',url:'https://arxiv.org/abs/1706.06083',desc:'PGD attack và adversarial training. Chuẩn benchmark cho robustness.'},
    {name:'McMahan et al. — Communication-Efficient FL (2017)',url:'https://arxiv.org/abs/1602.05629',desc:'FedAvg paper. Nền tảng của Federated Learning.'},
    {name:'Zhu et al. — Deep Leakage from Gradients (2019)',url:'https://arxiv.org/abs/1906.08935',desc:'Gradient Inversion — tái tạo training data từ FL gradients.'},
    {name:'Shokri et al. — Membership Inference Against ML (2017)',url:'https://arxiv.org/abs/1610.05820',desc:'Shadow model attack cho membership inference.'},
    {name:'Gu et al. — BadNets: Backdoor Attacks (2017)',url:'https://arxiv.org/abs/1708.06733',desc:'Neural backdoor attack paper gốc.'},
    {name:'Wang et al. — Neural Cleanse (2019)',url:'https://people.cs.uchicago.edu/~ravenben/publications/pdf/backdoor-sp19.pdf',desc:'Backdoor detection bằng reverse-engineering trigger.'},
    {name:'Dwork — Differential Privacy (2006)',url:'https://link.springer.com/chapter/10.1007/11681878_14',desc:'Định nghĩa formal Differential Privacy.'},
  ]},
  { cat:'Security Tools & Libraries', color:'#00c9ff', items:[
    {name:'Foolbox — Adversarial Attacks Library',url:'https://github.com/bethgelab/foolbox',desc:'Python library: FGSM, PGD, C&W, 30+ attacks. Tương thích PyTorch/TensorFlow.'},
    {name:'ART — Adversarial Robustness Toolbox (IBM)',url:'https://github.com/Trusted-AI/adversarial-robustness-toolbox',desc:'IBM: defenses + attacks + evaluation. Chuẩn công nghiệp.'},
    {name:'Opacus — Differential Privacy (Meta)',url:'https://opacus.ai/',desc:'DP training với PyTorch. DP-SGD, privacy accountant.'},
    {name:'Flower — Federated Learning Framework',url:'https://flower.dev/',desc:'FL simulation và production. 50+ baselines.'},
    {name:'TensorFlow Privacy',url:'https://github.com/tensorflow/privacy',desc:'DP-SGD, membership inference attack tools.'},
    {name:'TenSEAL — Homomorphic Encryption',url:'https://github.com/OpenMined/TenSEAL',desc:'CKKS HE cho neural network inference.'},
    {name:'CleverHans — Attack Benchmarks',url:'https://github.com/cleverhans-lab/cleverhans',desc:'Reference implementations adversarial attacks.'},
  ]},
  { cat:'Courses & Learning', color:'#a78bfa', items:[
    {name:'Trustworthy ML (Stanford CS329T)',url:'https://stanfordmlgroup.github.io/projects/trustworthy-ml/',desc:'Robustness, fairness, privacy trong ML. Miễn phí.'},
    {name:'Security & Privacy of ML (Berkeley)',url:'https://sp20.cs161.org/',desc:'Graduate course: attacks và defenses cho ML systems.'},
    {name:'Federated Learning (Google AI)',url:'https://federated.withgoogle.com/',desc:'Interactive guide về Federated Learning concepts.'},
    {name:'Privacy Enhancing Technologies (Coursera)',url:'https://www.coursera.org/learn/privacy-enhancing-technologies',desc:'DP, secure computation, anonymization.'},
    {name:'Hardware Security (Coursera — UMD)',url:'https://www.coursera.org/learn/hardware-security',desc:'Side-channel, hardware trojans, PUF.'},
  ]},
  { cat:'Competitions & Benchmarks', color:'#06d6a0', items:[
    {name:'RobustBench Leaderboard',url:'https://robustbench.github.io/',desc:'Benchmark adversarial robustness. AutoAttack evaluation.'},
    {name:'NIST AI Risk Management Framework',url:'https://www.nist.gov/system/files/documents/2023/01/26/NIST.AI.100-1.pdf',desc:'Framework quản lý rủi ro AI của NIST.'},
    {name:'MLSec Competition (IEEE SaTML)',url:'https://satml.org/',desc:'Conference chuyên về ML security. Paper submission.'},
    {name:'TrojAI Competition (IARPA)',url:'https://pages.nist.gov/trojai/',desc:'Phát hiện backdoor trong neural networks.'},
  ]},
]
